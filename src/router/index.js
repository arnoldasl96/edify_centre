import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Registration from '../views/Registration.vue';
import ForgotPassword from '../views/ForgotPassword.vue';
import NotFound from '../views/NotFound.vue';
import TokenService from '../services/Token.service';
import MyWorkshops from '../views/Dashboardviews/MyWorkshops.vue';
import workshopView from '../views/Dashboardviews/workshopView.vue';
import profile from '../views/Dashboardviews/profile.vue';
import UsersView from '../views/Dashboardviews/UsersView.vue';
import RequestsView from '../views/Dashboardviews/RequestsView.vue';
import AddWorkshop from '../views/Dashboardviews/AddWorkshop.vue';
import UserService from '../services/user.service';

const routes = [{
  path: '/testing',
  name: 'Home',
  component: Home,

},
{
  path: '/login',
  name: 'Login',
  component: Login,
  meta: {
    OnlyLoggedOut: true,
  },

},
{
  path: '/registration',
  name: 'Registration',
  component: Registration,
  meta: {
    OnlyLoggedOut: true,
  },

},
{
  path: '/',
  name: 'Dashboard',
  component: () => import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard.vue'),
  meta: {
    requiresAuth: true,
  },
  children: [{
    path: 'workshop',
    name: 'WorkshopsList',
    component: () => import(/* webpackChunkName: "workshopsList" */ '@/views/Dashboardviews/WorkshopsView.vue'),

  },
  {
    path: '/workshop/addWorkshop',
    name: 'AddWorkshop',
    component: AddWorkshop,
  },
  {
    path: '/workshop/:id',
    name: 'workshopView',
    component: workshopView,
  },
  {
    path: 'profile',
    name: 'profile',
    component: profile,
  },
  {
    path: 'users',
    name: 'UsersView',
    component: UsersView,
    meta: {
      requiresAdminRights: true,
    },
  },
  {
    path: 'myworkshops',
    name: 'MyWorkshops',
    component: MyWorkshops,
  },
  {
    path: 'requests',
    name: 'RequestsView',
    component: RequestsView,
    meta: {
      requiresAdminRights: true,
    },
  },
  {
    path: '/:NotFound(.*)*',
    component: NotFound,
  },
  ],
},
{
  path: '/forgotPassword',
  name: 'Forgot Password',
  component: ForgotPassword,
  meta: {
    OnlyLoggedOut: true,
  },

},
{
  path: '/:NotFound(.*)*',
  component: NotFound,
},
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched
    .some((record) => record.meta.requiresAuth); // if route requires Authentication
  const OnlyLoggedOut = to.matched
    .some((record) => record.meta.OnlyLoggedOut); // if route can be accessed only when logged out
  const requiresAdminRights = to.matched.some((record) => record.meta.requiresAdminRights);
  const isLoggedIn = TokenService.getToken();
  if (requiresAdminRights) {
    if (isLoggedIn) {
      const userRole = UserService.getRole();
      if (userRole === 'admin') {
        next();
      } else {
        next({
          path: 'workshop',
          query: { redirect: to.fullPath },
        });
      }
    } else {
      next({
        path: 'workshop',
        query: { redirect: to.fullPath },
      });
    }
  }
  if (requiresAuth) {
    if (isLoggedIn) {
      next();
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      });
    }
  } else if (OnlyLoggedOut) {
    if (isLoggedIn) {
      next({
        path: 'workshop',
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  }
});

export default router;
