import yargs from 'yargs';

const args = yargs
  .alias({
    p: 'production',
    t: 'testing',
  })
  .argv;

export default args;
