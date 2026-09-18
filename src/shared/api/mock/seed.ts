import type { AuthorRecord, BookRecord, SubscriptionRecord } from './records'

export function buildCoverUrl(title: string, year: number): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="320" viewBox="0 0 240 320">
    <rect width="240" height="320" fill="#e8e8e8" stroke="#bdbdbd"/>
    <rect x="12" y="12" width="216" height="296" fill="none" stroke="#bdbdbd"/>
    <text x="120" y="150" font-family="Georgia, serif" font-size="18" text-anchor="middle" fill="#333">${escapeXml(shorten(title))}</text>
    <text x="120" y="182" font-family="Georgia, serif" font-size="16" text-anchor="middle" fill="#777">${year}</text>
  </svg>`
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

function shorten(title: string): string {
  return title.length > 22 ? `${title.slice(0, 21)}…` : title
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export const authorSeed: AuthorRecord[] = [
  { id: 1, full_name: 'Иванов Сергей Петрович' },
  { id: 2, full_name: 'Петрова Мария Алексеевна' },
  { id: 3, full_name: 'Соколов Дмитрий Игоревич' },
  { id: 4, full_name: 'Кузнецова Анна Владимировна' },
  { id: 5, full_name: 'Морозов Артём Николаевич' },
  { id: 6, full_name: 'Лебедева Ольга Сергеевна' },
  { id: 7, full_name: 'Новиков Павел Андреевич' },
  { id: 8, full_name: 'Волкова Екатерина Дмитриевна' }
]

const books: Omit<BookRecord, 'cover_url'>[] = [
  {
    id: 1,
    title: 'Архитектура распределённых систем',
    year: 2021,
    description: 'Практическое руководство по проектированию сервисов, устойчивых к отказам и росту нагрузки.',
    isbn: '978-5-4461-1234-1',
    author_ids: [1]
  },
  {
    id: 2,
    title: 'Базы данных: теория и практика',
    year: 2021,
    description: 'Реляционная модель, нормализация, индексы и планы выполнения запросов на примерах MySQL.',
    isbn: '978-5-4461-1234-2',
    author_ids: [1, 3]
  },
  {
    id: 3,
    title: 'Чистый интерфейс',
    year: 2021,
    description: 'Принципы построения интерфейсов, которые понятны пользователю без обучения.',
    isbn: '978-5-4461-1234-3',
    author_ids: [2]
  },
  {
    id: 4,
    title: 'Тестирование веб-приложений',
    year: 2021,
    description: 'Пирамида тестов, модульные и интеграционные проверки, работа с тестовыми данными.',
    isbn: '978-5-4461-1234-4',
    author_ids: [1]
  },
  {
    id: 5,
    title: 'Асинхронность в JavaScript',
    year: 2022,
    description: 'Событийный цикл, промисы, async/await и типичные ошибки при работе с параллельными запросами.',
    isbn: '978-5-4461-1234-5',
    author_ids: [2, 5]
  },
  {
    id: 6,
    title: 'Проектирование REST API',
    year: 2022,
    description: 'Ресурсы, версионирование, коды ответов и документирование через OpenAPI.',
    isbn: '978-5-4461-1234-6',
    author_ids: [3]
  },
  {
    id: 7,
    title: 'Типы в TypeScript',
    year: 2022,
    description: 'Структурная типизация, дженерики, сужение типов и приёмы типобезопасного кода.',
    isbn: '978-5-4461-1234-7',
    author_ids: [2]
  },
  {
    id: 8,
    title: 'Производительность фронтенда',
    year: 2022,
    description: 'Метрики загрузки, оптимизация рендеринга и работа с изображениями.',
    isbn: '978-5-4461-1234-8',
    author_ids: [5]
  },
  {
    id: 9,
    title: 'Vue 3 в производственных проектах',
    year: 2023,
    description: 'Composition API, маршрутизация, управление состоянием и организация крупных приложений.',
    isbn: '978-5-4461-1234-9',
    author_ids: [4]
  },
  {
    id: 10,
    title: 'PHP и Yii2: рабочие рецепты',
    year: 2023,
    description: 'Модели, поведение ActiveRecord, миграции и построение REST-контроллеров.',
    isbn: '978-5-4461-1235-0',
    author_ids: [6, 7]
  },
  {
    id: 11,
    title: 'Docker для разработчика',
    year: 2023,
    description: 'Образы, тома, сети и сборка окружения разработки без установки зависимостей в систему.',
    isbn: '978-5-4461-1235-1',
    author_ids: [4]
  },
  {
    id: 12,
    title: 'Алгоритмы поиска и сортировки',
    year: 2023,
    description: 'Классические алгоритмы, оценка сложности и выбор структуры данных под задачу.',
    isbn: '978-5-4461-1235-2',
    author_ids: [4, 8]
  },
  {
    id: 13,
    title: 'Безопасность веб-приложений',
    year: 2024,
    description: 'Аутентификация, авторизация, защита от XSS, CSRF и SQL-инъекций.',
    isbn: '978-5-4461-1235-3',
    author_ids: [7]
  },
  {
    id: 14,
    title: 'Мониторинг и логирование',
    year: 2024,
    description: 'Сбор метрик, структурированные логи и построение понятных дашбордов.',
    isbn: '978-5-4461-1235-4',
    author_ids: [8]
  },
  {
    id: 15,
    title: 'Git в команде',
    year: 2024,
    description: 'Ветвление, ревью изменений, разрешение конфликтов и соглашения по коммитам.',
    isbn: '978-5-4461-1235-5',
    author_ids: [6]
  },
  {
    id: 16,
    title: 'Сетевые протоколы для веба',
    year: 2020,
    description: 'HTTP/1.1, HTTP/2, TLS и кеширование на стороне клиента и сервера.',
    isbn: '978-5-4461-1235-6',
    author_ids: [3, 5]
  }
]

export const bookSeed: BookRecord[] = books.map((book) => ({
  ...book,
  cover_url: buildCoverUrl(book.title, book.year)
}))

export const subscriptionSeed: SubscriptionRecord[] = []
