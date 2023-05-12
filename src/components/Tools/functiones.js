export const UserInternosActive = (query) => {
  let RetornoQuery = [];
  if (query != null && query != undefined) {
    RetornoQuery = query.filter((data) => (data.CLIENTE_INTERNO == true && data.CLIENTE_EXTERNO ==false));
  }
  return RetornoQuery;
};

export const UserExternosActive = (query) => {
  let RetornoQuery = [];
  if (query != null && query != undefined) {
    RetornoQuery = query.filter((data) => (data.CLIENTE_EXTERNO == true && data.CLIENTE_INTERNO ==false));
  }
  return RetornoQuery;
};

export const UserInternosInactive = (query) => {
  let RetornoQuery = [];
  if (query != null && query != undefined) {
    RetornoQuery = query.filter((data) => (data.CLIENTE_INTERNO == true && data.CLIENTE_EXTERNO == false ));
  }
  return RetornoQuery;
};

export const UserExternosInactive = (query) => {
    let RetornoQuery = [];
    if (query != null && query != undefined) {
      RetornoQuery = query.filter((data) => (data.CLIENTE_EXTERNO == true && data.CLIENTE_INTERNO ==false));
    }
    return RetornoQuery;
};
