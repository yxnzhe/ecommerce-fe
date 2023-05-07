<template>
    <div class="columns signin">
        <div class="svg-section column is-4">
            <div class="signin-svg">
                <img class="login_svg" src="@/assets/art/login.svg" alt="Login" />
            </div>
        </div>
        <div class="p-5 form column is-4">
            <div class="header-signin mb-4">
                <h1 class="title mb-2">Login</h1>
                <p clas="subtitle">Sign In to your account, or <a href="/register">Join us</a> now!</p>
            </div>
            <div class="field">
                <label class="label">Email</label>
                <div class="control">
                    <input class="input" v-model="email" type="email" placeholder="Email" required :class="[v$.email.$error ? 'form-warning' : '']"
                    @keyup.enter="login"/>
                    <span class="text-danger" v-if="v$.email.$error">
                        {{ v$.email.$errors[0].$message }}
                    </span>
                </div>
            </div>
    
            <div class="field">
                <label class="label">Password</label>
                <div class="control">
                    <input class="input" v-model="password" type="password" placeholder="Password" required :class="[v$.password.$error ? 'form-warning' : '']"
                    @keyup.enter="login"/>
                    <span class="text-danger" v-if="v$.password.$error">
                        {{ v$.password.$errors[0].$message }}
                    </span>
                </div>
            </div>

            <div class="field">
                <a class="is-pulled-right" href="/forgot-password">Forgot password?</a>
            </div>
            
            <div class="field">
                <div class="control">
                    <button class="button is-link" @click="login()">Login</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { supabase } from '@/supabase';
import bcrypt from 'bcryptjs';
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, helpers } from '@vuelidate/validators';

export default {
    name: 'SignIn',
    data() {
        return {
            email: '',
            password: '',
        }
    },
    mounted () {
        document.title = "Login | ZedStore"
    },
    setup() {
        return { v$: useVuelidate() }
    },
    methods: {
        deleteNotification() {
            const notification = document.querySelector('.notification');
            notification.style.display = 'none';
        },

        async update_last_login(email) {
            const { error } = await supabase
                .from('users')
                .update({ last_login: new Date().toISOString() })
                .eq('email', email)
            if (error) {
                console.log(error);
            }
        },
        async login() {
            this.v$.$validate()
            if(!this.v$.$error) {
                const pepper = process.env.VUE_APP_PEPPER;
                const { data, error } = await supabase
                    .from('users')
                    .select("*")
                    .eq('email', this.email)
                if (error) {
                    console.log(error);
                } else {
                    const pepper_password = this.password + pepper;
                    const match = await bcrypt.compare(pepper_password, data[0].password);
                    if (match) {
                        this.update_last_login(this.email);
                        this.$store.commit('setCurrentUser', data[0]);
                        this.$router.push('/');
                    } else {
                        console.log('Incorrect password');
                    }
                }
            }
        }
    },
    validations() {
        return {
            email: {
                required: helpers.withMessage('Email is required', required),
                email: helpers.withMessage('Email must be valid', email)
            },
            password: {
                required: helpers.withMessage('Password is required', required),
                minLength: helpers.withMessage('Password must contain at least 8 characters', minLength(8))
            },
        }
    }
}
</script>