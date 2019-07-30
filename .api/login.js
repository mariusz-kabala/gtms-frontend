module.exports = {
    path: '/v1/auth/authenticate',
    delay: 5000,
    method: 'POST',
    template: () => {
        return {
            accessToken:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjZGZiNmE2YmFkODhiYjVkYmYxZWNjZiIsImVtYWlsIjoidGVzdEBnZW90YWdzLnBsIiwiY291bnRyeUNvZGUiOiJQTCIsImxhbmd1YWdlQ29kZSI6InBsLVBMIiwicm9sZXMiOltdLCJpYXQiOjE1NTgyNjUxNTEsImV4cCI6MTU1ODI2NjA1MX0.FLnGuTgKBMrIAiO2aZnEa-4p-NL0YHv89aaW7_NBxcM',
            refreshToken:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjZGZiNmE2YmFkODhiYjVkYmYxZWNjZiIsImVtYWlsIjoidGVzdEBnZW90YWdzLnBsIiwiY291bnRyeUNvZGUiOiJQTCIsImxhbmd1YWdlQ29kZSI6InBsLVBMIiwicm9sZXMiOltdLCJpYXQiOjE1NTgyNjUxNTEsImV4cCI6MTU1ODM1MTU1MX0.InUZl7G-pOQBC8kUU3srT2XDysP-qyjP63U3X-w9Elw',
        }
    },
}
