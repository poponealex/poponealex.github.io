import indexnow from '../data/indexnow.json';

/**
 * The IndexNow key file, served at `/<key>.txt`.
 *
 * A submission is authenticated by fetching this file and checking it contains the
 * key that was submitted. That is the whole scheme, which is why the key is
 * committed in the open: it proves control of this domain and is worth nothing
 * anywhere else.
 *
 * The route is dynamic because the filename *is* the key. Only the one path below
 * is ever built, so this does not answer for any other `.txt` request.
 *
 * @returns The single path whose filename is the key.
 */
export function getStaticPaths() {
  return [{ params: { key: indexnow.key } }];
}

/**
 * Serve the key as plain text, with no trailing newline so the body is exactly the
 * key the submission carries.
 *
 * @returns The key as a plain-text response.
 */
export function GET() {
  return new Response(indexnow.key, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
