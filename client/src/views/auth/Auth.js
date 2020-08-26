
const Auth = {
    isAuthenticated:  JSON.parse(localStorage.getItem('isAuthenticated')) || false,
    isGoogleVerified: JSON.parse(localStorage.getItem('isGoogleVerified')) || false,
    authenticate(response) {
        const { user, isGoogleVerified, url } = response;
        if (user){
            if (url) localStorage.setItem('url', url);
            if (isGoogleVerified) {
                this.isGoogleVerified = isGoogleVerified;
                localStorage.setItem('isGoogleVerified', isGoogleVerified);
            }

            this.isAuthenticated = true;
            localStorage.setItem('isAuthenticated', this.isAuthenticated);
            localStorage.setItem('user', JSON.stringify(user));

            return this.isAuthenticated;
        }
        return false;
    },
    googleVerify(tokens) {
        if(!tokens) return false;

        this.isGoogleVerified = true;
        localStorage.setItem('isGoogleVerified', this.isGoogleVerified);
        return this.isGoogleVerified;
    },
    signout() {
        localStorage.removeItem('user');
        localStorage.removeItem('url');
        localStorage.removeItem('isGoogleVerified');
        localStorage.removeItem('isAuthenticated');
        window.location.reload();
    }
}

export default Auth;