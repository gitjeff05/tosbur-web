import { render, fireEvent, screen } from '@testing-library/vue';
import Component from './SidebarMenu.vue';

/**
 * Icons are integrated into our app through Vite and the
 * unplugin-icons plugin.
 * Since Jest and Vite are unaware of each other and do not
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
    render(Component);
    const searchButton = screen.getByTestId('images');
    expect(searchButton).toHaveClass('active');
});

test('search button emits changeview event on click', async () => {
    const { emitted } = render(Component);
    const searchButton = screen.getByTestId('search');
    // Dispatch a native click event to our button element.
    await fireEvent.click(searchButton);
    expect(emitted().changeview).toBeTruthy();
});

test('images button emits changeview event on click', async () => {
    const { emitted } = render(Component);
    const imagesButton = screen.getByTestId('images');
    // Dispatch a native click event to our button element.
    await fireEvent.click(imagesButton);
    expect(emitted().changeview).toBeTruthy();
});

test('containers button emits changeview event on click', async () => {
    const { emitted } = render(Component);
    const containersButton = screen.getByTestId('containers');
    // Dispatch a native click event to our button element.
    await fireEvent.click(containersButton);
    expect(emitted().changeview).toBeTruthy();
});
