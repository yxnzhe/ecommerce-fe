import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import LoginPage from '../views/pages/SignIn.vue'
import RegisterPage from '../views/pages/SignUp.vue'
import VerifyEmailPage from '../views/static/VerifyEmail.vue'
import TermsAndConditionsPage from '../views/static/TermsConditions.vue'
import ActivatedEmail from '../views/static/ActivatedEmail.vue'
import ProductPage from '../views/products/ProductPage.vue'
import CategoryPage from '../views/category/CategoryPage.vue'
import SearchPage from '../views/search/SearchProduct.vue'

const routes = [
  {
    path: '/',
    name: 'Home Page',
    component: HomePage
  },
  {
    path: '/login',
    name: 'Login Page',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'Register Page',
    component: RegisterPage
  },
  {
    path: '/verify-email',
    name: 'Verify Email',
    component: VerifyEmailPage
  },
  {
    path: '/terms-and-conditions',
    name: 'Terms and Conditions',
    component: TermsAndConditionsPage
  },
  {
    path: '/activation/:uid/:token',
    name: 'Activated Email',
    component: ActivatedEmail
  },
  {
    path: '/products/:id',
    name: 'Product Page',
    component: ProductPage
  },
  {
    path: '/category/:id',
    name: 'Category Page',
    component: CategoryPage
  },
  {
    path: '/search',
    name: 'Search Page',
    component: SearchPage
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
