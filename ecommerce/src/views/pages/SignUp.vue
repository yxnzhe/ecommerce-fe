<template>
    <div class="columns signup">
        <div class="svg-section column is-4">
            <div class="signup-svg m-auto">
                <img class="register_svg" src="@/assets/art/signup.svg" alt="Register" />
            </div>
        </div>
        <div class="p-5 form column is-4">
            <div class="header-signup mb-4">
                <h1 class="title mb-2">Register</h1>
                <p clas="subtitle">Create your account, or <a href="/login">Sign In</a> now!</p>
            </div>
            <div class="basic-information" v-if="!next">
                <div class="field">
                    <label class="label">Name</label>
                    <div class="control">
                        <input class="input" v-model="name" type="text" placeholder="Name" required :class="[v$.name.$error ? 'form-warning' : '']"
                        @keyup.enter="register"/>
                        <span class="text-danger" v-if="v$.name.$error">
                            {{ v$.name.$errors[0].$message }}
                        </span>
                    </div>
                </div>
        
                <div class="field">
                    <label class="label">Email</label>
                    <div class="control">
                        <input class="input" v-model="email" type="email" placeholder="Email" required :class="[v$.email.$error ? 'form-warning' : '']"
                        @keyup.enter="register"/>
                        <span class="text-danger" v-if="v$.email.$error">
                            {{ v$.email.$errors[0].$message }}
                        </span>
                    </div>
                </div>
        
                <div class="field">
                    <label class="label">Phone</label>
                    <div class="control">
                        <input class="input" v-model="phone" type="tel" placeholder="Phone" required :class="[v$.phone.$error ? 'form-warning' : '']"
                        @keyup.enter="register"/>
                        <span class="text-danger" v-if="v$.phone.$error">
                            {{ v$.phone.$errors[0].$message }}
                        </span>
                    </div>
                </div>
        
                <div class="field">
                    <label class="label">Password</label>
                    <div class="control">
                        <input class="input" v-model="password" type="password" placeholder="Password" required :class="[v$.password.$error ? 'form-warning' : '']"
                        @keyup.enter="register"/>
                        <span class="text-danger" v-if="v$.password.$error">
                            {{ v$.password.$errors[0].$message }}
                        </span>
                    </div>
                </div>
        
                <div class="field">
                    <label class="label">Confirm Password</label>
                    <div class="control">
                        <input class="input" v-model="confirmPassword" type="password" placeholder="Confirm Password" required :class="[v$.confirmPassword.$error ? 'form-warning' : '']"
                        @keyup.enter="register"/>
                        <span class="text-danger" v-if="v$.confirmPassword.$error">
                            {{ v$.confirmPassword.$errors[0].$message }}
                        </span>
                    </div>
                </div>

                <div class="field">
                    <div class="control">
                        <button class="button is-purple" @click="validate">Next</button>
                    </div>
                </div>
            </div>

            <div class="additional-details" v-if="next">
                <div class="field">
                    <label class="label">Shipping Address</label>
                    <div class="control">
                        <textarea rows="3" class="textarea" v-model="address" placeholder="Address" required :class="[v$.address.$error ? 'form-warning' : '']"
                        @keyup.enter="register"></textarea>
                        <span class="text-danger" v-if="v$.address.$error">
                            {{ v$.address.$errors[0].$message }}
                        </span>
                    </div>
                </div>
        
                <div class="columns mb-0">
                    <div class="column is-6 field">
                        <label class="label">Country</label>
                        <div class="control">
                            <div class="select is-fullwidth">
                                <select v-model="country" :class="[v$.country.$error ? 'form-warning' : '']"
                        @keyup.enter="register">
                                    <option value="" disabled>Select a Country</option>
                                    <option value="Malaysia">Malaysia</option>
                                    <option value="Singapore">Singapore</option>
                                    <option value="USA">USA</option>
                                    <option value="Australia">Australia</option>
                                </select>
                                <span class="text-danger" v-if="v$.country.$error">
                                    {{ v$.country.$errors[0].$message }}
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="column is-6 field">
                        <label class="label">State</label>
                        <div class="control">
                            <div class="select is-fullwidth">
                                <select v-model="state" :disabled="country != 'Malaysia'">
                                    <option value="" disabled selected>Select a State</option>
                                    <option value="Johor">Johor</option>
                                    <option value="Kedah">Kedah</option>
                                    <option value="Kelantan">Kelantan</option>
                                    <option value="Melaka">Melaka</option>
                                    <option value="Negeri Sembilan">Negeri Sembilan</option>
                                    <option value="Pahang">Pahang</option>
                                    <option value="Perak">Perak</option>
                                    <option value="Perlis">Perlis</option>
                                    <option value="Pulau Pinang">Pulau Pinang</option>
                                    <option value="Sabah">Sabah</option>
                                    <option value="Sarawak">Sarawak</option>
                                    <option value="Selangor">Selangor</option>
                                    <option value="Terengganu">Terengganu</option>
                                    <option value="Wilayah Persekutuan Kuala Lumpur">Wilayah Persekutuan Kuala Lumpur</option>
                                    <option value="Wilayah Persekutuan Labuan">Wilayah Persekutuan Labuan</option>
                                    <option value="Wilayah Persekutuan Putrajaya">Wilayah Persekutuan Putrajaya</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
        
                <div class="field">
                    <label class="label">ZIP Code</label>
                    <div class="control">
                        <input class="input" v-model="zipCode" type="text" placeholder="ZIP Code" required :class="[v$.zipCode.$error ? 'form-warning' : '']"
                        @keyup.enter="register"/>
                        <span class="text-danger" v-if="v$.zipCode.$error">
                            {{ v$.zipCode.$errors[0].$message }}
                        </span>
                    </div>
                </div>

                <div class="field">
                    <label class="checkbox">
                        <input type="checkbox" @click="agreeTnC = !agreeTnC" :class="[error ? 'form-warning' : '']">
                        I agree to the <a target="_blank" href="/terms-and-conditions">Terms and Conditions</a>
                    </label>
                    <span class="text-danger" v-if="error">
                        <br>{{ error }}
                    </span>
                </div>
        
                <div class="field">
                    <div class="control">
                        <button class="button is-purple" @click="register()">Register</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { supabase } from '@/supabase';
import { nanoid } from 'nanoid';
import bcrypt from 'bcryptjs';
import { useVuelidate } from '@vuelidate/core'
import { required, email, numeric, sameAs, minLength, maxLength, helpers } from '@vuelidate/validators'
import sendEmail from '@/emailjs'

export default {
    name: "SignUp",
    data () {
        return {
            name: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
            salt: "",
            address: "",
            country: "",
            state: "",
            zipCode: "",
            error: "",
            agreeTnC: false,
            terms_and_condition: false,
            registerToken: nanoid(),
            next: false,
        }
    },
    mounted () {
        document.title = "Register | ZedStore"
    },
    setup () {
        return { v$: useVuelidate() }
    },
    methods: {
        sendEmail(user_id, activation_token) {
            const params = {
                name: this.name,
                token: activation_token,
                user_email: this.email,
                user_id: user_id
            }

            sendEmail(params)
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
        },

        validate() {
            this.v$.$validate()
            if(!this.v$.name.$error && !this.v$.email.$error && !this.v$.phone.$error && !this.v$.password.$error && !this.v$.confirmPassword.$error) {
                this.v$.$reset()
                this.next = true
            }
        },

        hashPassword(password) {
            const pepper = process.env.VUE_APP_PEPPER
            this.salt = bcrypt.genSaltSync(10)

            const password_pepper = password + pepper
            const password_hash = bcrypt.hashSync(password_pepper, this.salt)

            return password_hash
        },

        async register () {
            this.v$.$validate()
            if(!this.v$.$error && this.agreeTnC) {
                const { data: details, error: details_error } = await supabase
                .from('customer_details')
                .insert([
                    {
                        address: this.address,
                        country: this.country,
                        state: this.state,
                        zip_code: this.zipCode
                    }
                ])
                .select();
    
                if (details_error) {
                    this.error = details_error.message
                } 
                else {
                    console.log(details[0].id)
                    const hased_password = this.hashPassword(this.password)
                    const { data: users, error: users_error } = await supabase
                    .from ('users')
                    .insert([
                        {
                            name: this.name,
                            email: this.email,
                            phone_number: this.phone,
                            password: hased_password,
                            salt: this.salt,
                            details_id: details[0].id,
                        }
                    ])
                    .select();
    
                    if (users_error) {
                        this.error = users_error.message
                    } 
                    else {
                        console.log(users[0].id)
                        const { error: token_error } = await supabase
                        .from('user_token')
                        .insert([
                            {
                                user_id: users[0].id,
                                token_type: 1,
                                token: this.registerToken
                            }
                        ])
                        .single()
    
                        if (token_error) {
                            this.error = token_error.message
                        } 
                        else {
                            this.sendEmail(this.user_id, this.registerToken)
                            this.$router.push({ name: 'Verify Email' })
                        }
                    }
                }
            }
            else {
                this.error = "Please agree to the Terms and Conditions"
            }
        }
    },
    validations() {
        return {
            name: {
                required: helpers.withMessage('Name is required', required),
                minLength: helpers.withMessage('Name must contain at least 3 characters', minLength(3))
            },
            email: {
                required: helpers.withMessage('Email is required', required),
                email: helpers.withMessage('Email must be valid', email)
            },
            phone: {
                required: helpers.withMessage('Phone Number is required', required),
                numeric: helpers.withMessage('Phone Number must only contain numbers', numeric),
            },
            password: {
                required: helpers.withMessage('Password is required', required),
                minLength: helpers.withMessage('Password must contain at least 8 characters', minLength(8))
            },
            confirmPassword: {
                required: helpers.withMessage('Confirm Password is required', required),
                sameAsPassword: helpers.withMessage('Password does not match', sameAs(this.password))
            },
            address: {
                required: helpers.withMessage('Address is required', required),
            },
            country: {
                required: helpers.withMessage('Country is required', required),
            },
            zipCode: {
                required: helpers.withMessage('ZIP Code is required', required),
                minLength: helpers.withMessage('Please enter a valid ZIP Code', minLength(5)),
                maxLength: helpers.withMessage('Please enter a valid ZIP Code', maxLength(5)),
                numeric: helpers.withMessage('ZIP Code must only contain numbers', numeric),
            }
        }
    } 
}
</script>