import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'books',
    component: () => import('@/pages/books').then((module) => module.BooksPage)
  },
  {
    path: '/books/new',
    name: 'book-create',
    component: () => import('@/pages/book-form').then((module) => module.BookFormPage),
    meta: { requiresAuth: true }
  },
  {
    path: '/books/:id',
    name: 'book',
    component: () => import('@/pages/book-details').then((module) => module.BookDetailsPage)
  },
  {
    path: '/books/:id/edit',
    name: 'book-edit',
    component: () => import('@/pages/book-form').then((module) => module.BookFormPage),
    meta: { requiresAuth: true }
  },
  {
    path: '/authors',
    name: 'authors',
    component: () => import('@/pages/authors').then((module) => module.AuthorsPage)
  },
  {
    path: '/authors/new',
    name: 'author-create',
    component: () => import('@/pages/author-form').then((module) => module.AuthorFormPage),
    meta: { requiresAuth: true }
  },
  {
    path: '/authors/:id',
    name: 'author',
    component: () => import('@/pages/author-details').then((module) => module.AuthorDetailsPage)
  },
  {
    path: '/authors/:id/edit',
    name: 'author-edit',
    component: () => import('@/pages/author-form').then((module) => module.AuthorFormPage),
    meta: { requiresAuth: true }
  },
  {
    path: '/report',
    name: 'report',
    component: () => import('@/pages/report').then((module) => module.ReportPage)
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login').then((module) => module.LoginPage)
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/pages/not-found').then((module) => module.NotFoundPage)
  }
]
