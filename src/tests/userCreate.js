import { auth } from 'firebase';
import { showMessage } from "react-native-flash-message";

jest.mock('firebase', () => ({
  auth: jest.fn(() => ({
    createUserWithEmailAndPassword: jest.fn(),
  })),
}));

jest.mock('your-message-library', () => ({
  showMessage: jest.fn(),
}));

describe('createUser', () => {
  let createUserWithEmailAndPassword;
  let showMessageMock;
  let setLoading;

  beforeEach(() => {
    createUserWithEmailAndPassword = auth().createUserWithEmailAndPassword;
    showMessageMock = showMessage;
    setLoading = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a user successfully and call backLogin', async () => {
    expect.assertions(4);

    const email = 'test@example.com';
    const password = 'password';
    const backLogin = jest.fn();

    createUserWithEmailAndPassword.mockResolvedValueOnce({});

    await createUser(email, password, backLogin);

    expect(setLoading).toHaveBeenCalledWith(true);
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(email, password);
    expect(setLoading).toHaveBeenCalledWith(false);
    expect(showMessageMock).toHaveBeenCalledWith({
      message: 'Your account has been created successfully',
      type: 'success',
    });
    expect(backLogin).toHaveBeenCalled();
  });

  it('should handle error and show error message', async () => {
    expect.assertions(4);

    const email = 'test@example.com';
    const password = 'password';
    const backLogin = jest.fn();
    const errorMessage = 'Invalid email';

    createUserWithEmailAndPassword.mockRejectedValueOnce({ message: errorMessage }); 

    await createUser(email, password, backLogin);

    expect(setLoading).toHaveBeenCalledWith(true);
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(email, password);
    expect(setLoading).toHaveBeenCalledWith(false);
    expect(showMessageMock).toHaveBeenCalledWith({
      message: errorMessage,
      type: 'danger',
    });
    expect(backLogin).not.toHaveBeenCalled();
  });
});
