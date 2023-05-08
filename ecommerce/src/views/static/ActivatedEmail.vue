<template>
    <div class="verified-email-container">
        <div class="email-verified" v-if="isVerified">
            <div class="verified-email-svg m-auto svg-section">
                <img class="verify-email-svg" src="@/assets/art/activated-email.svg" alt="Account activated" />
            </div>
            <div class="email-text mt-5">
                <h1 class="title">Account Verified</h1>
                <p class="subtitle mt-1">You may now <a href='/login'>login</a> to your account.</p>
            </div>
        </div>
        <div class="error-email-verified" v-if="isError">
            <div class="error-verified-email-svg m-auto svg-section">
                <img class="error-verify-email-svg" src="@/assets/art/error-verify.svg" alt="Error activating account" />
            </div>
            <div class="email-text mt-5">
                <h1 class="title">Error verifying your account</h1>
                <p class="subtitle mt-1">{{ msg }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { supabase } from '@/supabase';

export default {
    name: "ActivatedEmail",
    data() {
        return {
            uid: '',
            token: '',
            isVerified: false,
            isError: false,
            msg: '',
        }
    },
    mounted() {
        this.token = this.$route.params.token;
        this.verifyEmail(this.token);
    },
    methods: {
        async verifyEmail(user_token) {
            const { data: token_data, error: token_error } = await supabase
            .from('user_token')
            .select("*")
            .eq('token', user_token)

            if(token_error) {
                console.log(token_error)
            } 
            else {
                const user_data = token_data[0]
                if(user_data.is_redeemed == false) {
                    const current_date_time = new Date().toISOString()
                    if(user_data.validity > current_date_time) {
                        const { error: user_info_error } = await supabase
                        .from('users')
                        .update({ is_verified: true })
                        .eq('id', user_data.user_id)

                        if(user_info_error) {
                            console.log(user_info_error)
                        }
                        else {
                            const { error: token_error_verified } = await supabase
                            .from('user_token')
                            .update({ is_redeemed: true })
                            .eq('token', user_token)

                            if(token_error_verified) {
                                console.log(token_error_verified)
                            }
                            else {
                                this.isVerified = true
                                console.log('Email verified')
                            }
                        }
                    }
                    else {
                        this.isError = true
                        this.msg = "Token has expired."
                    }
                }
                else {
                    this.isError = true
                    this.msg = "Token is invalid or has already been redeemed. Please contact our administrator for assistant."
                }
            }
        }
    }
}
</script>