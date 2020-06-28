const { log } = console

// 15. 三数之和
// 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。答案中不可以包含重复的三元组。
// 双指针：双指针法的适用范围比较广，一般像求和、比大小的都可以用它来解决。但是有一个前提：数组必须有序
// 利用排序还可以去重
// 时间复杂度 O(n2) 空间复杂度 O(1)
const threeSum = (nums) => {
  const result = []
  nums.sort((a, b) => a - b)
  for (let i = 0, len = nums.length; i < len; i++) {
    // 排除 nums[i] === nums[i - 1] 的情况
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue
    }
    let start = i + 1,
      end = len - 1
    while (start < end) {
      const total = nums[i] + nums[start] + nums[end]
      if (total === 0) {
        result.push([nums[i], nums[start], nums[end]])
        start++
        end--
        // 如果新指针值与旧指针值相同则跳过
        while (start < end && nums[start] === nums[start - 1]) {
          start++
        }
        while (start < end && nums[end] === nums[end + 1]) {
          end--
        }
      } else if (total > 0) {
        // 如果值太大，就左移末尾指针
        end--
      } else {
        // 如果值太小，就右移起始指针
        start++
      }
    }
  }

  return result
}
// 给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位数字。
// 如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。
// 您可以假设除了数字 0 之外，这两个数都不会以 0 开头。
const addTwoNumbers = () => {}

// 1. 双数之和。给定一个整数数组 nums  和一个目标值 target，请你在该数组中找出和为目标值的那两个整数，并返回他们的数组下标。
// 给定 nums = [2, 7, 11, 15], target = 9
// 因为 nums[0] + nums[1] = 2 + 7 = 9
// 所以返回 [0, 1]
// 哈希表
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
