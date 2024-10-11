import { createClient } from "../../utils/server";

/**
 * Get the currently logged in user's information.
 *
 * @returns A promise which resolves to an object with the following properties:
 *   - `data`: The current user, or `null` if no user is logged in
 *   - `error`: An error object if something went wrong, or `null` if the
 *     operation was successful
 */

export const getUserInfo = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  return { data, error };
};
