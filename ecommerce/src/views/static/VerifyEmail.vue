<template>
    <div class="verify-email-container">
        <div class="verify-email">
            <div class="email-svg m-auto">
                <img width="50%" src="@/assets/art/verify_email-sent.svg" alt="Verify email sent" />
            </div>
            <div class="email-text mt-5">
                <h1 class="title">Verify your email</h1>
                <p class="subtitle">Please check your email for the verification link.</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "VerifyEmail",
}
</script>

<style scoped>
.verify-email-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70vh;
}

.verify-email {
  text-align: center;
}
</style>
