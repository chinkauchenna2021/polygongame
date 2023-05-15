import React from "react";
import BigNumber from "bignumber.js";
import { setIntervalAsync, clearIntervalAsync } from "set-interval-async";

export const moveToHome = (moveTo) => {
  window.location.href = moveTo;
};

export const moveBack = () => {
  window.history.back("/");
};

export const addressShortener = (data) => {
  const convertArray = Array.from(data);
  const firstArray = convertArray.slice(0, 3).join("");
  const lastArray = convertArray.reverse().slice(0, 5).join("");
  return firstArray + "..." + lastArray;
};

export const displayGameNumbers = (min, max) => {
  let numberHolder = [];
  if (typeof min == "string" && typeof max == "string") return;
  for (let minNumber = min; minNumber <= max; minNumber++) {
    if (max == 0) return;
    numberHolder.push(minNumber);
  }

  return numberHolder;
};

export const convertToMilliseconds = (date) => {
  const dateInMilliseconds = new Date(date).getTime();
  return dateInMilliseconds;
};

export const convertToDate = (milliseconds) => {
  const dateConverted = new Date(milliseconds).toLocaleString();
  return dateConverted;
};

export const convertToBigNumber = (bigNumber) => {
  return new BigNumber(bigNumber);
};

export const stripSpaces = (data) => {
  const str = data.replace(/\s+/g, "-").toLowerCase();
  return str;
};

export const setOnLocal = (name, data) => {
  const saved = window.localStorage.setItem(name, data);
  if (!saved) return;
  return "saved with  the key " + name;
};

export const getOnLocal = (name) => {
  const data = window.localStorage.getItem(name);
  if (!data) return;
  return data;
};

export const clearLocal = (name) => {
  const removed = window.localStorage.removeItem(name);
  return name + " is removed";
};

export const startInterval = (method, timeMilliSeconds) => {
  const setTimer = setIntervalAsync(() => {
      method();
  }, timeMilliSeconds);

//   clearIntervalAsync(setTimer);
};
