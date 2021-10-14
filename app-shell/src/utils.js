import { useActions } from 'piral'

export const getAuth = () => {
    const { readState } = useActions();
    const user = readState(m => m.app.user);
    return user;
}