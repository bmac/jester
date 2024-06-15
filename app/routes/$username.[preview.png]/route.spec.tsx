import { describe, expect, it, vi } from "vitest";
import { loader } from './route';
import { LoaderFunctionArgs } from "@remix-run/node";

describe('loader', () => {
    const request = new Request('');
    const context = {};
    it('should respond with a cached image', async () => {

        vi.spyOn(previewService, 'createPreviewImage').mockReturnValue(null);
        const response = await loader({context, request, params: { username: 'bmac' }} as LoaderFunctionArgs);

        expect(response.headers.get('cache-control')).toBe('asdf');
        expect(response.headers.get('content-type')).toBe('img/png');

        
    });
});
