import { render, fireEvent } from '@testing-library/vue';
import Component from './SidebarMenu.vue';

test('default view from store is active', async () => {
    const { getByTestId } = render(Component);

    const searchButton = getByTestId('search');
    expect(searchButton).toHaveClass('active');
});

test('search button emits changeview event on click', async () => {
    const { getByTestId, emitted } = render(Component);
    const searchButton = getByTestId('search');
    // Dispatch a native click event to our button element.
    await fireEvent.click(searchButton);
    expect(emitted().changeview).toBeTruthy();
});

test('images button emits changeview event on click', async () => {
    const { getByTestId, emitted } = render(Component);
    const imagesButton = getByTestId('images');
    // Dispatch a native click event to our button element.
    await fireEvent.click(imagesButton);
    expect(emitted().changeview).toBeTruthy();
});

test('containers button emits changeview event on click', async () => {
    const { getByTestId, emitted } = render(Component);
    const containersButton = getByTestId('containers');
    // Dispatch a native click event to our button element.
    await fireEvent.click(containersButton);
    expect(emitted().changeview).toBeTruthy();
});
