import { render, fireEvent } from '@testing-library/vue';
import Component from './SidebarMenu.vue';

/**
 * Icons are integrated into our app through Vite and the
 * unplugin-icons plugin.
 * Since Jest and Vite are unaware of eachother and do not
 * share any configuration, we mock the console.warn for this
 * test to quiet the large number of verbose warnings.
 */
beforeEach(() => {
    jest.spyOn(console, 'warn');
    console.warn.mockImplementation(() => {});
});
afterEach(() => {
    console.warn.mockRestore();
});

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
