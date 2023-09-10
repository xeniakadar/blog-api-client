import deleteBlogpost from './path-to-your-deleteBlogpost-function';

// Mocking the global fetch function
global.fetch = jest.fn();

// Mocking localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};

global.localStorage = localStorageMock;

// Mocking window.location.reload
global.window = Object.create(window);
Object.defineProperty(window, 'location', {
  value: {
    reload: jest.fn()
  }
});

describe('deleteBlogpost function', () => {
  beforeEach(() => {
    fetch.mockClear();
    localStorageMock.getItem.mockClear();
    window.location.reload.mockClear();
  });

  it('deletes the blogpost and reloads the page on success', async () => {
    const mockEvent = { preventDefault: jest.fn() };
    const mockId = 123;

    // Mocking a successful fetch response
    fetch.mockResolvedValueOnce({ ok: true });

    // Mocking a token in localStorage
    localStorageMock.getItem.mockReturnValueOnce('mockToken');

    await deleteBlogpost(mockEvent, mockId);

    expect(fetch).toHaveBeenCalledWith(`https://link.com/api/blogposts/${mockId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer mockToken"
      },
    });
    expect(window.location.reload).toHaveBeenCalledTimes(1);
  });

  it('logs an error if the response is not okay', async () => {
    const mockEvent = { preventDefault: jest.fn() };
    const mockId = 123;
    const mockErrorData = { error: 'Some error message' };

    // Mocking an unsuccessful fetch response
    fetch.mockResolvedValueOnce({
      ok: false,
      json: jest.fn().mockResolvedValueOnce(mockErrorData)
    });

    // Mocking a token in localStorage
    localStorageMock.getItem.mockReturnValueOnce('mockToken');

    // Spying on console.error to ensure it gets called with the correct message
    const errorSpy = jest.spyOn(console, 'error');

    await deleteBlogpost(mockEvent, mockId);

    expect(fetch).toHaveBeenCalled();
    expect(errorSpy).toHaveBeenCalledWith('error creating post:', mockErrorData);
    errorSpy.mockRestore();
  });

  it('logs an error if there is a problem with the fetch request', async () => {
    const mockEvent = { preventDefault: jest.fn() };
    const mockId = 123;
    const mockErrorMessage = 'Fetch failed';

    // Mocking a fetch rejection
    fetch.mockRejectedValueOnce(new Error(mockErrorMessage));

    // Mocking a token in localStorage
    localStorageMock.getItem.mockReturnValueOnce('mockToken');

    // Spying on console.error to ensure it gets called with the correct message
    const errorSpy = jest.spyOn(console, 'error');

    await deleteBlogpost(mockEvent, mockId);

    expect(fetch).toHaveBeenCalled();
    expect(errorSpy).toHaveBeenCalledWith('an error occurred: ', new Error(mockErrorMessage));
    errorSpy.mockRestore();
  });
});
