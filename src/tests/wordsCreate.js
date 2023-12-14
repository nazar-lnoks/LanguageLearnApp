import { collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../Firebase';
import { Popup } from 'popup-ui';

jest.mock('../Firebase', () => ({
  db: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  addDoc: jest.fn(),
}));

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
}));

jest.mock('popup-ui', () => ({
  Popup: {
    show: jest.fn(),
    hide: jest.fn(),
  }
}));

describe('checkWords', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should show error message if one or both inputs are empty', () => {
    expect.assertions(5);

    const ukrainianInput = '';
    const englishInput = 'test';

    Popup.show.mockImplementationOnce((options) => {
      expect(options.type).toBe('Danger');
      expect(options.title).toBe('Invalid words');
      expect(options.textBody).toBe('One or two words are empty. Please enter correctly');
      expect(options.buttontext).toBe('Ok');
      options.callback();
    });

    const result = checkWords(ukrainianInput, englishInput);

    expect(result).toBe(false);
    expect(Popup.show).toHaveBeenCalled();
  });

  it('should add a word and show success message', async () => {
    expect.assertions(7);

    const ukrainianInput = 'українська';
    const englishInput = 'ukrainian';

    addDoc.mockResolvedValueOnce({});
    Popup.show.mockImplementationOnce((options) => {
      expect(options.type).toBe('Success');
      expect(options.title).toBe('Word added successfully');
      expect(options.textBody).toBe('Congrats! Your word added to list');
      expect(options.buttontext).toBe('Ok');
      options.callback();
    });

    await checkWords(ukrainianInput, englishInput);

    const auth = getAuth();

    const wordsCollectionRef = collection(db, "words");

    expect(addDoc).toHaveBeenCalledWith(wordsCollectionRef, {
      ukrainian: ukrainianInput,
      english: englishInput,
      uid: auth.currentUser.uid,
    });
    expect(Popup.show).toHaveBeenCalled();
  });
});