<?php
// /api/telegram.php
declare(strict_types=1);

// 1) Загрузка конфигурации (вне веб-корня)
// Путь: ~/secure/iskra_secrets.php (домашняя директория пользователя)

// Получаем домашнюю директорию разными способами
$homeDir = null;
if (function_exists('posix_getpwuid') && function_exists('posix_geteuid')) {
  $userInfo = posix_getpwuid(posix_geteuid());
  $homeDir = $userInfo['dir'] ?? null;
}
if (!$homeDir) {
  $homeDir = getenv('HOME') ?: (isset($_SERVER['HOME']) ? $_SERVER['HOME'] : null);
}
if (!$homeDir && isset($_SERVER['DOCUMENT_ROOT'])) {
  // Пробуем определить домашнюю директорию через DOCUMENT_ROOT
  $docRoot = $_SERVER['DOCUMENT_ROOT'];
  // Обычно DOCUMENT_ROOT = /home/username/public_html или /var/www/username
  $homeDir = dirname($docRoot);
}

// Пробуем также альтернативные пути
$possiblePaths = [];
if ($homeDir) {
  $possiblePaths[] = rtrim($homeDir, '/') . '/secure/iskra_secrets.php';  // ~/secure/iskra_secrets.php
  $possiblePaths[] = rtrim($homeDir, '/') . '/Secure/iskra_secrets.php';   // ~/Secure/iskra_secrets.php (с большой буквы)
}

// Добавляем пути относительно текущего файла
$possiblePaths[] = dirname(__DIR__, 1) . '/../secure/iskra_secrets.php';   // ../secure/ от корня сайта
$possiblePaths[] = dirname(__DIR__, 1) . '/../Secure/iskra_secrets.php';    // ../Secure/ от корня сайта
$possiblePaths[] = dirname(__DIR__, 2) . '/secure/iskra_secrets.php';      // secure/ на уровень выше
$possiblePaths[] = dirname(__DIR__, 2) . '/Secure/iskra_secrets.php';      // Secure/ на уровень выше
$possiblePaths[] = dirname(__DIR__, 1) . '/secure/iskra_secrets.php';     // secure/ рядом с api
$possiblePaths[] = dirname(__DIR__, 1) . '/Secure/iskra_secrets.php';      // Secure/ рядом с api
$possiblePaths[] = __DIR__ . '/../secure/iskra_secrets.php';               // secure/ относительно api
$possiblePaths[] = __DIR__ . '/../Secure/iskra_secrets.php';                // Secure/ относительно api

if (isset($_SERVER['DOCUMENT_ROOT'])) {
  $possiblePaths[] = dirname($_SERVER['DOCUMENT_ROOT']) . '/secure/iskra_secrets.php';
  $possiblePaths[] = dirname($_SERVER['DOCUMENT_ROOT']) . '/Secure/iskra_secrets.php';
}

// Убираем дубликаты и null значения
$possiblePaths = array_unique(array_filter($possiblePaths));

$secretsPath = null;
foreach ($possiblePaths as $path) {
  if (file_exists($path)) {
    $secretsPath = $path;
    break;
  }
}

if (!$secretsPath) {
  http_response_code(500);
  $debugInfo = [
    'HOME' => $homeDir,
    'DOCUMENT_ROOT' => $_SERVER['DOCUMENT_ROOT'] ?? 'not set',
    'checked_paths' => $possiblePaths,
    'current_dir' => __DIR__,
    'parent_dir' => dirname(__DIR__, 1)
  ];
  error_log('CONFIG_NOT_FOUND: ' . json_encode($debugInfo, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
  echo json_encode([
    'ok' => false, 
    'error' => 'CONFIG_NOT_FOUND', 
    'message' => 'Файл конфигурации не найден. Проверьте путь к файлу iskra_secrets.php'
  ]);
  exit;
}

$secrets = require $secretsPath;

$ALLOWED_ORIGINS = $secrets['ALLOWED_ORIGINS'] ?? [];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowOrigin = in_array($origin, $ALLOWED_ORIGINS, true) ? $origin : ($ALLOWED_ORIGINS[0] ?? '*');

// Общие заголовки
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: $allowOrigin");
header('Vary: Origin');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(204);
  exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['ok' => false, 'error' => 'METHOD_NOT_ALLOWED']);
  exit;
}

// Ограничим размер
if ((int)($_SERVER['CONTENT_LENGTH'] ?? 0) > 64 * 1024) {
  http_response_code(413);
  echo json_encode(['ok' => false, 'error' => 'PAYLOAD_TOO_LARGE']);
  exit;
}

// Чтение JSON
$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'BAD_JSON']);
  exit;
}

// 2) Валидация полей (после удаления hCaptcha)
$take = fn(string $s, int $n) => mb_strlen($s) > $n ? mb_substr($s, 0, $n) : $s;
$sanitize = fn(string $s) => strtr($s, ['&'=>'&amp;', '<'=>'&lt;', '>'=>'&gt;']);

$website = $take(trim((string)($data['website'] ?? '')), 300);
$filledMs = (int)($data['filled_in_ms'] ?? 0);

// Honeypot: если поле "website" заполнено — считаем запрос спамом и выходим успешно, но без отправки в Telegram
if ($website !== '') {
  echo json_encode(['ok' => true]);
  exit;
}

// Anti-bot таймер: если форма отправлена слишком быстро (< 800 ms), также считаем это подозрительным
if ($filledMs > 0 && $filledMs < 800) {
  echo json_encode(['ok' => true]);
  exit;
}

$name = $take(trim((string)($data['name'] ?? '')), 300);
$contact_method = $take(trim((string)($data['contact_method'] ?? '')), 50);
$contact = $take(trim((string)($data['contact'] ?? '')), 300);
$wishes = $take(trim((string)($data['wishes'] ?? '')), 2000);
$page = $take(trim((string)($data['page'] ?? '')), 1000);
$utm  = (isset($data['utm']) && is_array($data['utm'])) ? $data['utm'] : [];

if ($name === '' || $contact_method === '' || $contact === '') {
  http_response_code(422);
  echo json_encode(['ok' => false, 'error' => 'FIELDS_MISSING']);
  exit;
}

$utmStr = $utm ? implode(', ', array_map(
  fn($k,$v) => $k.'='.strval($v),
  array_keys($utm), $utm
)) : '—';

// 3) Отправка в Telegram
$BOT_TOKEN = $secrets['BOT_TOKEN'] ?? '';
$CHAT_ID   = $secrets['CHAT_ID'] ?? '';
$MANAGER_ID= $secrets['MANAGER_ID'] ?? null;

if ($BOT_TOKEN === '' || $CHAT_ID === '') {
  http_response_code(500);
  echo json_encode(['ok' => false, 'error' => 'ENV_MISSING']);
  exit;
}

$text = "📩 <b>Новая заявка с сайта iSKRA Tour</b>\n"
      . "👤 <b>Имя:</b> " . $sanitize($name) . "\n"
      . "📞 <b>Связь:</b> " . $sanitize($contact_method) . " — " . $sanitize($contact) . "\n"
      . "📝 <b>Пожелания:</b> " . $sanitize($wishes ?: '—') . "\n"
      . "🔗 <b>Страница:</b> " . $sanitize($page ?: '—') . "\n"
      . "🏷️ <b>UTM:</b> " . $sanitize($utmStr) . "\n"
      . "⏰ <b>Время:</b> " . date('d.m.Y H:i:s');

$send = function(string $chatId) use ($BOT_TOKEN, $text) {
  $ch = curl_init("https://api.telegram.org/bot{$BOT_TOKEN}/sendMessage");
  curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
    CURLOPT_POSTFIELDS => json_encode([
      'chat_id' => $chatId,
      'text' => $text,
      'parse_mode' => 'HTML',
      'disable_web_page_preview' => true,
    ]),
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 10,
    CURLOPT_SSL_VERIFYPEER => true,
    CURLOPT_SSL_VERIFYHOST => 2,
  ]);
  $resp = curl_exec($ch);
  $http = curl_getinfo($ch, CURLINFO_HTTP_CODE);
  $errn = curl_errno($ch);
  curl_close($ch);

  if ($errn !== 0 || !$resp || $http >= 400) {
    throw new Exception("TELEGRAM_ERROR:{$http}");
  }
};

try {
  $send($CHAT_ID);
  if ($MANAGER_ID) { try { $send($MANAGER_ID); } catch(Throwable $e) {} }
} catch(Throwable $e) {
  http_response_code(502);
  echo json_encode(['ok' => false, 'error' => 'TELEGRAM_ERROR', 'message' => $e->getMessage()]);
  exit;
}

// Успешно
echo json_encode(['ok' => true]);
