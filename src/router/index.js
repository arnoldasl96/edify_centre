import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login'
import Registration from '../views/Registration'
import Dashboard from '../views/Dashboard'
import ForgotPassword from '../views/ForgotPassword'
import NotFound from '../views/NotFound'
import TokenService from '../services/Token.service'
import WorkshopsView from '../views/Dashboardviews/WorkshopsView'
import profile from '../views/Dashboardviews/profile'
import AddWorkshop from '../views/Dashboardviews/AddWorkshop'
const routes = [{
        path: '/',
        name: 'Home',
        component: Home,

    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            OnlyLoggedOut: true,
        }

    },
    {
        path: '/registration',
        name: 'Registration',
        component: Registration,
        meta: {
            OnlyLoggedOut: true,
        }

    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: {
            requiresAuth: true,
        },
        children: [{
                path: 'workshop',
                name: 'Workshop',
                component: WorkshopsView,

            },
            {
                path: '/workshop/addWorkshop',
                name: 'AddWorkshop',
                component: AddWorkshop,
            },
            {
                path: 'profile',
                name: 'profile',
                component: profile,
            }
        ]
    },
    {
        path: '/forgotPassword',
        name: 'Forgot Password',
        component: ForgotPassword,
        meta: {
            OnlyLoggedOut: true,
        }

    }, {
        path: '/*',
        component: NotFound
    }

]
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth); // if route requires Authentication 
    const OnlyLoggedOut = to.matched.some((record) => record.meta.OnlyLoggedOut); // if route can be accessed only when logged out 
    const isLoggedIn = TokenService.getToken();
    if (requiresAuth) {
        if (isLoggedIn) {
            next()
        } else {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        }
    } else if (OnlyLoggedOut) {
        if (isLoggedIn) {
            next({
                path: '/dashboard/workshop',
                query: { redirect: to.fullPath }
            })
        } else {
            next();
        }
    } else {
        next()
    }
})

export default router