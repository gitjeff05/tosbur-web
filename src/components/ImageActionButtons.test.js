import { render, screen } from '@testing-library/vue';
import Component from './ImageActionButtons.vue';

test('start button should be not be disabled if user is not actively configuring another image', async () => {
    render(Component, {
        props: {
            image: { Id: 1, RepoTags: ['Hey Ho', 'hi'], Size: 10125231 },
            configuringImage: {},
        },
    });

    const startButton = screen.getByTestId('start');
    expect(startButton).toHaveProperty('disabled', false);
});

test('start button should be disabled if user is actively configuring another image', async () => {
    render(Component, {
        props: {
            image: { Id: 1, RepoTags: ['Hey Ho', 'hi'], Size: 10125231 },
            configuringImage: { Id: 2 },
        },
    });

    const startButton = screen.getByTestId('start');
    expect(startButton).toHaveProperty('disabled', true);
});

test('start button should be disappear if user is actively configuring this image', async () => {
    render(Component, {
        props: {
            image: { Id: 1, RepoTags: ['Hey Ho', 'hi'], Size: 10125231 },
            configuringImage: { Id: 1 },
        },
    });
    expect(() => screen.getByTestId('start')).toThrow(
        'Unable to find an element by: [data-testid="start"]'
    );
});
