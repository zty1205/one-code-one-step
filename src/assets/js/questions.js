const questions = [{
  id: 1,
  title: '两数之和',
  content: [
    '给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。',
    '你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。'
  ],
  explame: [
    '给定 nums = [2, 7, 11, 15], target = 9',
    '因为 nums[0] + nums[1] = 2 + 7 = 9',
    '所以返回 [0, 1]'
  ],
  difficulty: 2,
  dName: '简单',
  path: 'sums.html',
  info: [
    '查找下标，不应对原数组进行sort',
    '本提主要考察 - 查找算法'
  ],
  answer: [
    {
      aid: 1,
      desc: '暴力破解',
      explain: '',
      content: `
      let twoSum = function (nums, target) {
        function findIndex(nums, i, delNum) {
          for (let idx = i + 1; idx < nums.length; idx++) {
            if (nums[idx] === delNum) {
              return idx
            }
          }
          return -1
        }
        if (!nums || nums.length < 2) {
          return []
        } else if (nums.length === 2) {
          return nums[0] + nums[1] === target ? [0, 1] : []
        } else {
          for (let i = 0; i < nums.length; i++) {
            let idx = findIndex(nums, i, target - nums[i])
            if (idx !== -1) {
              return [i, idx]
            }
          }
        }
        return []
      };
      `,
      level: 'O(n^2)'
    },
    {
      aid: 2,
      desc: 'hash映射 使得查找更加方便',
      explain: '',
      content: `
      var isDef = function(val) {
        return val !== undefined && val !== null && val !== ''
      }
      var twoSum = function(nums, target) {
        var map = {}
        for (let i = 0; i < nums.length; i++) {
          map[nums[i]] = i;
        }
        for (var i = 0; i < nums.length; i++) {
          var delNum = target - nums[i];
          if (isDef(map[delNum]) && map[delNum] !== i) {
            return [i, map[delNum]]
          }
        }
        return false
      }
      `,
      level: 'O(n)'
    }
  ]
},
{
  id: 2,
  title: '两数相加',
  content: [
  '给出两个 非空 的链表用来表示两个非负的整数。',
  '其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。',
  '如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。',
  '您可以假设除了数字 0 之外，这两个数都不会以 0 开头。'
  ],
  explame: [
    '输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)',
    '输出：7 -> 0 -> 8',
    '原因：342 + 465 = 807',
  ],
  difficulty: 3,
  dName: '中等',
  path: 'addTwoNumbers.html',
  info: [
    '链表的简单应用',
    'node = node.next',
    '不能直接转string变数值相加，会超过最大数值',
    '模拟加法计算过程'
  ],
  answer: [
    {
      aid: 1,
      desc: '模拟加法计算过程',
      explain: '',
      content: `
      var addTwoNumbers = function (l1, l2) {
        var sum;var add = 0;
        var node = new ListNode('header') // 头指针
        var tmp = node
        while(l1 || l2) {
          var n1 = l1 ? l1.val : 0
          var n2 = l2 ? l2.val : 0
          sum = n1 + n2 + add
          add = sum / 10 >= 1 ? 1 : 0  // 进位标志
          tmp.next = new ListNode(sum % 10)
          tmp = tmp.next
          if(l1) l1 = l1.next
          if(l2) l2 = l2.next
        }
        if( add > 0 ) tmp.next = new ListNode(add)
        return node.next
      };
      `,
      level: 'O(n)'
    }
  ]
},{
  id: 7,
  title: '整数翻转',
  content: [
    '给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。',
    '假设我们的环境只能存储得下 32 位的有符号整数，则其数值范围为 [−2^31,  2^31 − 1]。',
    '请根据这个假设，如果反转后整数溢出那么就返回 0。'
  ],
  explame: [
    '输入: 123, 输出: 321',
    '输入: -123, 输出: -321',
    '输入: 120, 输出: 21'
  ],
  difficulty: 2,
  dName: '简单',
  path: 'reverse.html',
  info: [
    '如何将数字反过来，并且去头部的0',
    '注意越界问题'
  ],
  answer: [
    {
      aid: 1,
      desc: '数组的reverse方法',
      explain: '',
      content: `
      var reverse = function(x) {
        let f = false
        if (x < 0) {
          f = true
        }
        var str = f ? String(x).substring(1) : String(x)
        var strList = str.split('').reverse()
        for (var i = 0; i < strList.length; i++) {
          if (strList[i] === '0') {
            strList[i] = undefined
          } else {
            break; 
          }
        }
        var str = strList.filter(x => x).join('')
        var num = Number(str)
        var number = f ? -num  : num
        if (number < -Math.pow(2, 31) || number > Math.pow(2, 31) -1) {
          number = 0
        }
        return number
      };
      `,
      level: 'O(n)'
    },
    {
      aid: 2,
      desc: '运用移位',
      explain: '相当于两辆火车 1. A的车尾去B的车尾  2. A的倒数第二 去 B 的车尾，原本B车尾*10上升一位。 3 上车采用加法',
      content: `
      var reverse = function (x) {
        let overflow = function (x) {
          return (x >= Math.pow(2, 31) - 1 || x <= -Math.pow(2, 31)) ? 0 : x
        }
        x = overflow(x)
      
        let isNegative = x < 0
        if (isNegative) {
          x = -x
        }
        let a = 0
        while (x > 9) {
          a = a * 10 + x % 10 * 10 // 求余 乘10
          console.log('a = ', a)
          x = parseInt(x / 10)
          console.log('x = ', x)
        }
        a += x
      
        return isNegative ? overflow(-a) : overflow(a)
      };
      `,
      level: ''
    }
  ]
},
{
  id: 209,
  title: '长度最小的子数组',
  content: [
    '给定一个含有 n 个正整数的数组和一个正整数 s ，找出该数组中满足其和 ≥ s 的长度最小的连续子数组。',
    '如果不存在符合条件的连续子数组，返回 0。'
  ],
  explame: [
    '输入: s = 7, nums = [2,3,1,2,4,3]',
    '输出: 2',
    '解释: 子数组 [4,3] 是该条件下的长度最小的连续子数组。'
  ],
  difficulty: 3,
  dName: '中等',
  path: 'minSubArrayLen.html',
  info: [
    '连续的子数组',
    '滑动窗口算法',
    '如果你已经完成了O(n) 时间复杂度的解法, 请尝试 O(n log n) 时间复杂度的解法。'
  ],
  answer: [
    {
      aid: 1,
      desc: '暴力破解',
      explain: '',
      content: `
      function minSubArrayLen(s, nums) {
        let length = nums.length
        if (length === 0) {
          return 0
        }
        if (nums.find(x => x >= s)) {
          return 1
        }
        let min = Infinity
        for (let i = 0; i < length - 1; i++) {
          let sum = nums[i]
          for (let j = i+1; j < length; j++) {
            sum += nums[j]
            if (sum >= s) {
              min = Math.min(min, j - i + 1)
              break
            }
          }
        }
        return min === Infinity ? 0 : min
      }
      `,
      level: 'O(n^2)'
    },
    {
      aid: 2,
      desc: '滑动窗口算法',
      explain: '',
      content: `
      var minSubArrayLen = function (s, nums) {
        var length = nums.length
        if (length === 0) {
          return 0
        }
        var left = 0
        var right = 0 // 左右窗口
        var sum = 0
        var min = window.Infinity
        while (right < length) {
          sum += nums[right];
          right++;
          while (sum >= s) { // 只要一满足 就是当前最短的
            min = Math.min(min, right - left);
            sum -= nums[left];
            left++;
          }
        }
        return min === window.Infinity ? 0 : min;
      };
      `,
      level: 'O(n)'
    },
    {
      aid: 3,
      desc: '二分查找',
      explain: '找到长度为一半的连续数的最大和，最大和小于 s 则扩大长度，大于s则缩小长度，小的话 扩大长度 minLen 向 maxLen靠近，大的话 缩小长度 max 向 minLen靠近，两者相等后结束，其实也可以为 两侧固定的窗口 在滑动。 滑动一轮后 根据和的大小 跳转窗口的宽度 知道为0或是最长',
      content: `
      function minSubArrayLen(s, nums) {
        var length = nums.length;
        if (length === 0) {
          return 0;
        }
        var minLen = 0, maxLen = length;
        var midLen;
        var min = -1;
        while (minLen <= maxLen) {
            //取中间的长度
            midLen = (minLen + maxLen) >>> 1;
            //判断当前长度的最大和是否大于等于 s
            if (getMaxSum(midLen, nums) >= s) {
                maxLen = midLen - 1; //减小长度
                min = midLen; //更新最小值
            } else {
                minLen = midLen + 1; //增大长度
            }
        }
        return min === -1 ? 0 : min;
      }
      `,
      level: 'O(n log n)'
    }
  ]
},{
  id: 677,
  title: '键值映射',
  content: [
    '实现一个 MapSum 类里的两个方法，insert 和 sum。',
    '对于方法 insert，你将得到一对（字符串，整数）的键值对。字符串表示键，整数表示值。',
    '如果键已经存在，那么原来的键值对将被替代成新的键值对。',
    '对于方法 sum，你将得到一个表示前缀的字符串，你需要返回所有以该前缀开头的键的值的总和。'
  ],
  explame: [
    '输入: insert("apple", 3), 输出: Null',
    '输入: sum("ap"), 输出: 3',
    '输入: insert("app", 2), 输出: Null',
    '输入: sum("ap"), 输出: 5'
  ],
  difficulty: 3,
  dName: '中等',
  path: 'MapSum.html',
  info: [
    'ES6的map',
    '前缀可以考虑正则或是前缀树'
  ],
  answer: [
    {
      aid: 1,
      desc: '正则匹配',
      explain: '',
      content: `
      var MapSum = function() {
        this.map = new Map()
      };

      MapSum.prototype.insert = function(key, val) {
        this.map.set(key, val)
      };
      
      MapSum.prototype.sum = function(prefix) {
        var arr = [...this.map]
        var reg = new RegExp('^(\${prefix})')
        let sum = 0
        for (let i = 0; i < arr.length; i++) {
          var item = arr[i]
          if (reg.test(item[0])) {
            sum += item[1]
          }
        }
        return sum
      };
      `,
      level: 'O(n)'
    }
  ]
},{
  id: 231,
  title: "2的幂",
  content: [
    '给定一个整数，编写一个函数来判断它是否是 2 的幂次方。'
  ],
  explame: [
    '输入: 1 输出: true 解释: 2^0 = 1',
    '输入: 16 输出: true 解释: 2^4 = 16',
    '输入: 218 输出: false'
  ],
  difficulty: 1,
  dName: '简单',
  path: 'isPowerOfTwo.html',
  info: [
    'while',
    '位运算'
  ],
  answer: [
    {
      aid: 1,
      desc: '除',
      explain: '',
      content: `
      var isPowerOfTwo = function(n) {
        if (n === 0) return false
        while(Number.isInteger(n)) {
          n = n / 2
        }
        return n === 0.5
      };
      
      var isPowerOfTwo = function(n) {
        return Number.isInteger(Math.log2(n));
      };
      `,
      level: 'O(log2(n))'
    },
    {
      aid: 1,
      desc: '位运算且',
      explain: '2的幂数的数字的二进制有且只有一个1，其余均是0 n & (n-1)：清零最低位的1  合起来 n & (n-1) == 0',
      content: `
      var isPowerOfTwo = function(n) {
        return n > 0 && (n & (n-1)) === 0;
      };
      `,
      level: 'O(log2(n))'
    }
  ]
}
]

export default questions
