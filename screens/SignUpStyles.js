import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
    backgroundColor: '#0e0e0e',
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
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
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
  signupButton: {
    backgroundColor: '#ff4b2b',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 30,
  },
  signupButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  loginText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 10,
  },
  loginLink: {
    color: '#ff4b2b',
    fontWeight: '600',
  },
  termsContainer: {
    marginTop: 20,
  },
  termsText: {
    color: '#888',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },
  termsLink: {
    color: '#ff4b2b',
  },

   errorLabel: {
  color: 'red',
  marginTop: 4,
  fontSize: 12,
   },

  
});
