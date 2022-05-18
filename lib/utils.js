export const pexel = (id) =>
    `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260`;

export const lorempics = (id, w = 300, h = 500, args = 'chemistry') =>
    `https://source.unsplash.com/random/${w}x${h}?sig=${id}`; // `https://picsum.photos/${w}/${h}?random=${id}`

export const getIdentity = (session) => {
    if (!session) return undefined;
    if (session?.user?.identities?.length != 0)
        return {
            id: session.user.identities[0].id,
            ...session.user.identities[0].identity_data,
        };
};

export const getFullName = (session) =>
    getIdentity(session) ? getIdentity(session).full_name : null;

export const getPropic = (session) =>
    getIdentity(session) ? getIdentity(session)?.avatar_url : null;

export const getEmail = (session) => session?.user?.email;

export const getAccessToken = (session) => session?.access_token;

const getUiSchemaElements = (schemaProperties) =>
    Object.entries(schemaProperties).map(([id, { label, type, properties }]) =>
        type != 'object'
            ? {
                  type: 'Control',
                  scope: `#/properties/${id}`,
                  label,
              }
            : {
                  type: 'Control',
                  scope: `#/properties/${id}`,
                  label,
                  elements: getUiSchemaElements(properties),
              }
    );

export const getUiSchema = (schema, type = 'VerticalLayout', append) => {
    try {
        return {
            type,
            elements: getUiSchemaElements(schema.properties),
            ...append,
        };
    } catch (e) {
        console.log(e);
        return null;
    }
};
