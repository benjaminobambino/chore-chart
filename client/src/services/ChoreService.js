import Client from '.';

export const GetChores = async (householdId) => {
  try {
    const res = await Client.get(`/households/${householdId}`);
    return res.data.chores;
  } catch (error) {
    throw error;
  }
};
