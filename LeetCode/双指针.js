// 3. 无重复字符的最长子串
// 滑窗 双指针的一种
const lengthOfLongestSubstring = (s) => {
  let max = 0
  const map = new Map()
  // debugger
  // i 右指针， j 左指针
  for (let i = 0, j = 0; i < s.length; i++) {
    if (map.has(s[i])) {
      // 确保左指针只往右划，map 中所保存的值可能已在滑窗外了
      j = Math.max(map.get(s[i]) + 1, j)
    }
    max = Math.max(max, i - j + 1)
    map.set(s[i], i)
  }
  return max
}
console.log(lengthOfLongestSubstring('abba'))

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
