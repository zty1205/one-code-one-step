function runList(input = [], res = [], func) {
  input.forEach((item, idx) => {
    const result = func(...item);
    console.log(
      `input: ${item}, expect res ${res[idx]} === ${result}, isRight: ${String(result) === String(res[idx])}`
    );
  });
}
