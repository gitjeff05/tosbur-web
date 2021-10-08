import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/vue';
import Component from './ContainerImage.vue';

test('Cancel button should be visible when user is configuring image', async () => {
    const image = { Id: 1, RepoTags: ['Hey Ho', 'hi'], Size: 10125231 };
    render(Component, {
        props: {
            image,
            configuringImage: { Id: 1 },
        },
    });
    expect(screen.getByTestId('cancel')).toBeDefined();
});

test('Config data should be hidden when user is configuring image', async () => {
    render(Component, {
        props: {
            image: { Id: 1, RepoTags: ['Hey Ho', 'hi'], Size: 10125231 },
            configuringImage: { Id: 1 },
        },
    });
    expect(() => screen.getByTestId('entrypoint')).toThrow(
        'Unable to find an element by: [data-testid="entrypoint"]'
    );
    expect(() => screen.getByTestId('cmd')).toThrow(
        'Unable to find an element by: [data-testid="cmd"]'
    );
    expect(() => screen.getByTestId('ports')).toThrow(
        'Unable to find an element by: [data-testid="ports"]'
    );
});
