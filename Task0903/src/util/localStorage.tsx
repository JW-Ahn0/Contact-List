import { Contact } from "../type/Contact";

export function getGroupFromLocalStorage(): string[] {
  const str = localStorage.getItem("group");
  if (str) return JSON.parse(str) as string[];
  else return ["가족", "친구", "직장", "스터디"];
}

export function getContactListFromLocalStorage(): Contact[] {
  const str = localStorage.getItem("contactList");
  if (str) return JSON.parse(str) as Contact[];
  else return [];
}

export function setGroupListAtLocalStorage(groupList: string[]): void {
  localStorage.setItem("group", JSON.stringify(groupList));
}
