const { log } = console

// 2. 三数之和 v1
// 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。答案中不可以包含重复的三元组。
// 思路同两数之和
// 缺点，没去重。
const threeSum = (nums) => {
  const res = [],
    diffs = {},
    sum = 0
  for (let i = 0, len = nums.length - 2; i < len; i++) {
    for (let j = i + 1, leng = nums.length - 1; j < leng; j++) {
      if (diffs[sum - nums[i] - nums[j]] !== undefined) {
        res.push([nums[i], nums[j], sum - nums[i] - nums[j]])
      } else {
        diffs[nums[j]] = j
      }
    }
  }
  return res
}
// threeSum([-1,0,1,2,-1,-4]) // [[-1,1,0],[-1,-1,2],[0,-1,1],[1,-1,0]]

// 1. 给定一个整数数组 nums  和一个目标值 target，请你在该数组中找出和为目标值的那两个整数，并返回他们的数组下标。
// 给定 nums = [2, 7, 11, 15], target = 9
// 因为 nums[0] + nums[1] = 2 + 7 = 9
// 所以返回 [0, 1]
const twoSum = (nums, target) => {
  const diffs = {}
  for (let i = 0, len = nums.length; i < len; i++) {
    // 将另一个 "值-键" 存入对象中，如果有符合要求的值就直接返回
    // 不等于 undefined 是为了排除 0
    if (diffs[target - nums[i]] !== undefined) {
      return [diffs[target - nums[i]], i]
    }
    diffs[nums[i]] = i
  }
  return []
}
// log(twoSum([2, 7, 11, 15], 9))
