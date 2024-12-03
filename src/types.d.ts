interface Participant {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  phoneNumber: string;
  checkinStatus: "pending" | "checked-in";
  checkinTime: string;
}


interface User {
  email: string;
  fullName: string;
}
