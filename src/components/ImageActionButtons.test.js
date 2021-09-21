import { render } from '@testing-library/vue';
import Component from './ImageActionButtons.vue';

test('start button should be not be disabled if user is not actively configuring another image', async () => {
    const { getByTestId } = render(Component, {
        props: {
            image: { Id: 1, RepoTags: ['Hey Ho', 'hi'], Size: 10125231 },
            configuringImage: {},
        },
    });

    const startButton = getByTestId('start');
    expect(startButton).toHaveProperty('disabled', false);
});

test('start button should be disabled if user is actively configuring another image', async () => {
    const { getByTestId } = render(Component, {
        props: {
            image: { Id: 1, RepoTags: ['Hey Ho', 'hi'], Size: 10125231 },
            configuringImage: { Id: 2 },
        },
    });

    const startButton = getByTestId('start');
    expect(startButton).toHaveProperty('disabled', true);
});

test('start button should be disappear if user is actively configuring this image', async () => {
    const { getByTestId, debug } = render(Component, {
        props: {
            image: { Id: 1, RepoTags: ['Hey Ho', 'hi'], Size: 10125231 },
            configuringImage: { Id: 1 },
        },
    });
    expect(() => getByTestId('start')).toThrow(
        'Unable to find an element by: [data-testid="start"]'
    );
});
