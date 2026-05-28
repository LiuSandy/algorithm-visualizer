import { AlgorithmDefinition } from './types';
import { bubbleSort } from './sorting/bubble';
import { selectionSort } from './sorting/selection';
import { insertionSort } from './sorting/insertion';
import { quickSort } from './sorting/quick';
import { mergeSort } from './sorting/merge';
import { heapSort } from './sorting/heap';
import { shellSort } from './sorting/shell';
import { countingSort } from './sorting/counting';
import { radixSort } from './sorting/radix';

import { binarySearch } from './searching/binary';
import { interpolationSearch } from './searching/interpolation';
import { exponentialSearch } from './searching/exponential';
import { fibonacciSearch } from './searching/fibonacci';

import { dfs } from './graph/dfs';
import { bfs } from './graph/bfs';
import { dijkstra } from './graph/dijkstra';
import { prim } from './graph/prim';
import { kruskal } from './graph/kruskal';
import { topologicalSort } from './graph/topological';
import { unionFind } from './graph/unionFind';
import { eulerPath } from './graph/euler';

import { reverseLinkedList } from './linkedlist/reverse';
import { mergeTwoLists } from './linkedlist/merge';
import { hasCycleList } from './linkedlist/hasCycle';
import { detectCycleList } from './linkedlist/detectCycle';
import { treePreorder } from './tree/preorder';
import { treeInorder } from './tree/inorder';
import { treePostorder } from './tree/postorder';
import { treeLevelOrder } from './tree/levelorder';
import { treeBuildBST } from './tree/buildBst';
import { treeCheckBalanced } from './tree/balanced';
import { treeMaxDepth } from './tree/maxDepth';
import { treeLCA } from './tree/lca';

import { nQueens } from './backtracking/nqueens';
import { hanoi } from './backtracking/hanoi';
import { permutations } from './backtracking/permutations';
import { combinationSum } from './backtracking/combinationSum';
import { mazePath } from './backtracking/maze';
import { lcs } from './dp/lcs';
import { fibonacciDp } from './dp/fibonacci';

import { climbingStairs } from './dp/climbingStairs';
import { knapsack } from './dp/knapsack';
import { editDistance } from './dp/editDistance';
import { lis } from './dp/lis';
import { maxSubarraySum } from './sliding-window/maxSubarraySum';
import { minSubArrayLen } from './sliding-window/minSubArrayLen';
import { lengthOfLongestSubstring } from './sliding-window/lengthOfLongestSubstring';

import { euclideanAlgorithm } from './math/euclidean';
import { sieveOfEratosthenes } from './math/sieve';
import { validParentheses } from './string/validParentheses';
import { stringMatching } from './string/stringMatching';
import { lruCacheAlgorithm } from './practical/lruCache';
import { fisherYatesShuffle } from './practical/fisherYates';
import { bloomFilterAlgorithm } from './practical/bloomFilter';

import { consistentHashing } from './practical/consistentHashing';
import { trieAlgorithm } from './tree/trie';
import { skipListAlgorithm } from './linked-list/skipList';
import { redBlackTreeAlgorithm } from './tree/redBlackTree';
import { bPlusTreeAlgorithm } from './tree/bPlusTree';
import { rsa } from './cryptography/rsa';
import { caesarCipher } from './cryptography/caesarCipher';
import { vigenereCipher } from './cryptography/vigenereCipher';
import { kMeans } from './machine-learning/kMeans';
import { knn } from './machine-learning/knn';
import { linearRegression } from './machine-learning/linearRegression';
import { perceptron } from './machine-learning/perceptron';
import { huffmanCoding } from './compression/huffmanCoding';
import { lzwCompression } from './compression/lzwCompression';
import { fordFulkerson } from './graph/fordFulkerson';
import { edmondsKarp } from './graph/edmondsKarp';
import { kmp } from './string/kmp';
import { rabinKarp } from './string/rabinKarp';
import { zAlgorithm } from './string/zAlgorithm';
import { segmentTree } from './tree/segmentTree';
import { fenwickTree } from './tree/fenwickTree';
import { avlTree } from './tree/avlTree';
import { hashTable } from './practical/hashTable';

export const algorithms: AlgorithmDefinition[] = [
  bubbleSort,
  selectionSort,
  insertionSort,
  quickSort,
  mergeSort,
  heapSort,
  shellSort,
  countingSort,
  radixSort,
  binarySearch,
  interpolationSearch,
  exponentialSearch,
  fibonacciSearch,
  dfs,
  bfs,
  dijkstra,
  prim,
  kruskal,
  topologicalSort,
  unionFind,
  eulerPath,
  reverseLinkedList,
  mergeTwoLists,
  hasCycleList,
  detectCycleList,
  treePreorder,
  treeInorder,
  treePostorder,
  treeLevelOrder,
  treeBuildBST,
  treeCheckBalanced,
  treeMaxDepth,
  treeLCA,
  nQueens,
  hanoi,
  permutations,
  combinationSum,
  mazePath,
  lcs,
  fibonacciDp,
  climbingStairs,
  knapsack,
  editDistance,
  lis,
  maxSubarraySum,
  minSubArrayLen,
  lengthOfLongestSubstring,
  euclideanAlgorithm,
  sieveOfEratosthenes,
  validParentheses,
  stringMatching,
  lruCacheAlgorithm,
  fisherYatesShuffle,
  bloomFilterAlgorithm,
  consistentHashing,
  trieAlgorithm,
  skipListAlgorithm,
  redBlackTreeAlgorithm,
  bPlusTreeAlgorithm,
  rsa,
  caesarCipher,
  vigenereCipher,
  kMeans,
  knn,
  linearRegression,
  perceptron,
  huffmanCoding,
  lzwCompression,
  fordFulkerson,
  edmondsKarp,
  kmp,
  rabinKarp,
  zAlgorithm,
  segmentTree,
  fenwickTree,
  avlTree,
  hashTable
];

export const getAlgorithm = (id: string) => algorithms.find(a => a.id === id) || algorithms[0];