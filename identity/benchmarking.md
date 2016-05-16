---
title: Benchmarking
---

## Benchmarking

### Results

To see the results of our benchmarks see the [performance](https://github.com/dadi/identity/blob/docs/docs/performance.md) document.

### Run them yourself

We've provieded a benchmark script to measure the performance of generating UUIDs.

To prepare and run the benchmark, issue:

	node benchmark/benchmark.js

You'll see an output like this:

	Starting benchmark process
	nodeuuid.v4() - using node.js crypto RNG: 235072 UUIDs/second
	nodeuuid.v4() - using Math.random() RNG: 229885 UUIDs/second
	nodeuuid.v4('binary'): 183891 UUIDs/second
	nodeuuid.v4('binary', buffer): 180375 UUIDs/second
	140byte.es_v4: 220264 UUIDs/second

* The `uuid()` entries are for Nikhil Marathe's [uuid module](https://bitbucket.org/nikhilm/uuidjs) which is a wrapper around the native libuuid library
* The `uuidjs()` entries are for Patrick Negri's [uuid-js module](https://github.com/pnegri/uuid-js) which is a pure javascript implementation based on [UUID.js](https://github.com/LiosK/UUID.js) by LiosK

If you want to get more reliable results you can run the benchmark multiple times and write the output into a log file:


	$ [sudo] for i in {0..9}; do node benchmark/benchmark.js >> benchmark/bench_0.4.12.log; done;

If you're interested in how performance varies between different node versions, you can issue the above command multiple times.

You can then use the shell script `bench.sh` provided in the benchmark directory to calculate the averages over all benchmark runs and draw a nice plot:

	$ [sudo] (cd benchmark/ && ./bench.sh)

This assumes you have [gnuplot](http://www.gnuplot.info/) and [ImageMagick](http://www.imagemagick.org/) installed. You'll find a nice `bench.png` graph in the `benchmark/` directory on completion.
