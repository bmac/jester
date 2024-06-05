import { describe, expect, it } from "vitest";
import { parseUsername } from "./parseUsername";

describe('parseUsername', () => {
    it('should parse the username from formData', async () => {
        const formData = new FormData();
        formData.append('username', 'octocat');
        expect(await parseUsername(formData)).toEqual({
            username: 'octocat'
        });
    });


    it('should trim the username', async () => {
        const formData = new FormData();
        formData.append('username', ' octocat ');
        expect(await parseUsername(formData)).toEqual({
            username: 'octocat'
        });
    });


    it('should lowercase the username', async () => {
        const formData = new FormData();
        formData.append('username', 'OCTOCAT');
        expect(await parseUsername(formData)).toEqual({
            username: 'octocat'
        });
    });

    it('should allow dash in the username', async () => {
        const formData = new FormData();
        formData.append('username', 'octo-cat');
        expect(await parseUsername(formData)).toEqual({
            username: 'octo-cat'
        });
    });


    it('should error if the username is empty', async () => {
        const formData = new FormData();
        expect(parseUsername(formData)).rejects.toMatchObject({
            status: 400
        })
    });

    it('should error if the username contains is the empty string', async () => {
        const formData = new FormData();
        formData.append('username', '');
        expect(parseUsername(formData)).rejects.toMatchObject({
            status: 400
        })
    });

    it('should error if the username contains a slash', async () => {
        const formData = new FormData();
        formData.append('username', 'octo/cat');
        expect(parseUsername(formData)).rejects.toMatchObject({
            status: 400
        })
    });

    it('should error if the username contains an underscore', async () => {
        const formData = new FormData();
        formData.append('username', 'octo_cat');
        expect(parseUsername(formData)).rejects.toMatchObject({
            status: 400
        })
    });
});
