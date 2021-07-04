import '@testing-library/jest-dom';
import React from 'react';
// import API mocking utilities from Mock Service Worker.
import {rest} from 'msw';
import {setupServer} from 'msw/node';
// import testing utilities
import {render, fireEvent, screen, act, waitFor} from '@testing-library/react';
import {initUser} from "../app/contexts/auth-context";
import Login from '../pages/auth/Login';

const fakeUserResponse = {
    data: {
        access_token: 'fake_user_token',
        user: initUser
    }
};

const server = setupServer(
    rest.post('/auth/sign-in', (req, res, ctx) => {
        return res(ctx.json(fakeUserResponse));
    }),
);

beforeAll(() => server.listen());
afterEach(() => {
    server.resetHandlers();
    window.localStorage.removeItem('jwt_access_token');
})
afterAll(() => server.close());

test('allows the user to login successfully', async () => {
    const {container} = render(<Login />);

    fireEvent.change(screen.getByLabelText('E-Mail Address'), {
        target: {value: 'example@gmail.com'},
    });
    fireEvent.change(screen.getByLabelText('Password'), {
        target: {value: '123456'},
    });

    const btn = container.querySelector<HTMLButtonElement>('button[type="submit"]');

    expect(btn).not.toBeNull();

    // jwt token fake not have exp time
    await screen.findByText('E-Mail Address');

    await act( async () => {
        await btn!.click();
    });

    await waitFor(() => {
        expect(window.localStorage.getItem('jwt_access_token')).toEqual(fakeUserResponse.data.access_token)
    });
});

test('handles server exceptions', async () => {
    server.use(
        rest.post('/api/sign-in', (req, res, ctx) => {
            return res(ctx.status(500), ctx.json({message: 'Internal server error'}));
        }),
    );

    const {container} = render(<Login />);

    fireEvent.change(screen.getByLabelText('E-Mail Address'), {
        target: {value: 'test@test.test'},
    })
    fireEvent.change(screen.getByLabelText('Password'), {
        target: {value: 'qwerty'},
    })

    const btn = container.querySelector<HTMLButtonElement>('button[type="submit"]');

    expect(btn).not.toBeNull();

    // jwt token fake not have exp time
    await screen.findByText('E-Mail Address');

    await act( async () => {
        await btn!.click();
    });

    await waitFor(() => {
        expect(window.localStorage.getItem('jwt_access_token')).toBeNull();
    });
});
