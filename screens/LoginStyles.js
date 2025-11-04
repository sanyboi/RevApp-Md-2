import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
    backgroundColor: '#0e0e0e',
  },
  backButtonContainer: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginBottom: 100,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 70,
    height: 70,
  },
  logoText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 5,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: '#fff',
    marginBottom: 6,
    fontSize: 14,
  },
  input: {
    backgroundColor: '#2A303E',
    color: '#fff',
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#3A4150',
  },
  forgotContainer: {
    alignItems: 'flex-end',
    marginBottom: 30,
  },
  forgotText: {
    color: '#9d9dff',
    fontSize: 13,
  },
  loginButton: {
    backgroundColor: '#ff4b2b',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 30,
  },
  loginText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  orText: {
    color: '#999',
    textAlign: 'center',
    marginBottom: 20,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 25,
    marginBottom: 30,
  },
  socialCircle: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialIcon: {
    width: 25,
    height: 25,
  },
  signupText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 10,
  },
  signupLink: {
    color: '#ff4b2b',
    fontWeight: '600',
  },
  errorLabel: {
  color: 'red',
  marginTop: 4,
  fontSize: 12,
},
});
