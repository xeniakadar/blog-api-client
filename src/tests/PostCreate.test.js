import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import PostCreate from '../components/PostCreate';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([{ _id: 'test_topic_1', title: 'Test Topic' }])
  })
);

beforeEach(() => {
  fetch.mockImplementation(() =>
    Promise.resolve({
      ok:true,
      json: () => Promise.resolve([{ _id: 'test_topic_1', title: 'Test Topic' }])
    })
  );
});

describe('<PostCreate />', () => {
  it('renders the component and displays the topic fetched', async () => {
    render(
      <MemoryRouter>
        <PostCreate />
      </MemoryRouter>
    );

    const topicElement = await screen.findByText('Test Topic');
    expect(topicElement).toBeInTheDocument();
  });



  it('handles title and text input', () => {
    render(
      <MemoryRouter>
        <PostCreate />
      </MemoryRouter>
    );

    // simulating user typing inputs
    fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'Test Title' } });
    fireEvent.change(screen.getByPlaceholderText('What are your thoughts?'), { target: { value: 'Test Thoughts' } });

    // check if inputs have correct values
    expect(screen.getByPlaceholderText('Title').value).toBe('Test Title');
    expect(screen.getByPlaceholderText('What are your thoughts?').value).toBe('Test Thoughts');
  });

});
