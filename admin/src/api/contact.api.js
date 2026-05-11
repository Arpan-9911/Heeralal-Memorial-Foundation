import API from "./axios";

// CREATE CONTACT
export const submitContactForm = async (formData) => {
  const { data } = await API.post("/contact", formData);

  return data;
};

// GET CONTACTS
export const getContacts = async () => {
  const { data } = await API.get("/contact");

  return data.contacts;
};

// UPDATE STATUS
export const updateContactStatus = async (id, status) => {
  const { data } = await API.put(`/contact/${id}`, {
    status,
  });

  return data.contact;
};

// DELETE
export const deleteContact = async (id) => {
  const { data } = await API.delete(`/contact/${id}`);

  return data;
};
