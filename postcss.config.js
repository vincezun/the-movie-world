module.exports = ctx => {
  const plugins = {
    autoprefixer: {
      ...ctx.options.autoprefixer,
      flexbox: true,
      grid: true
    }
  };

  return { plugins };
};
