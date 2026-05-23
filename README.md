# iSKRA Tour

Официальный сайт туристического проекта iSKRA Tour.

## Описание

Сайт содержит информацию о подборе туров, популярных направлениях, услугах, контактах и формах обратной связи. Проект сделан как статический сайт с небольшим PHP API для отправки заявок в Telegram.

## Структура

- `www/iskra-tour.ru/` — основные файлы сайта
- `www/iskra-tour.ru/index.html` — главная страница
- `www/iskra-tour.ru/contacts/` — страница контактов
- `www/iskra-tour.ru/qr/` — QR-страница
- `www/iskra-tour.ru/css/` — стили
- `www/iskra-tour.ru/js/` — JavaScript
- `www/iskra-tour.ru/images/` — изображения
- `www/iskra-tour.ru/api/telegram.php` — обработчик заявок

## Важно

Файлы с секретами, логами, архивами и серверной конфигурацией не должны попадать в репозиторий. Они исключаются через `.gitignore`.

## Запуск

Для просмотра сайта достаточно открыть файл:

```text
www/iskra-tour.ru/index.html
