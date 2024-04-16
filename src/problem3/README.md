## Problem 3:

### [Goto fully refactor code without comment for more readable](#complete-code)

> 💡 Highlight `NOTE:` to see explanation

```typescript
interface WalletBalance {
  currency: string
  amount: number
}
// NOTE: remove duplicate code
interface FormattedWalletBalance extends WalletBalance {
  // currency: string
  // amount: number
  formatted: string
}

// interface Props extends BoxProps {}

const priorityMapping = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
}

// NOTE: use props for div element
const WalletPage: React.FC<
  React.PropsWithChildren<React.ComponentPropsWithoutRef<'div'>>
> = (props) => {
  const { children, ...rest } = props
  const balances = useWalletBalances()
  const prices = usePrices()

  // NOTE: add blockchain type; change blockchain argument to currency for more readable
  const getPriority = (blockchain: string): number => {
    switch (blockchain) {
      case 'Osmosis':
        return 100
      case 'Ethereum':
        return 50
      case 'Arbitrum':
        return 30
      // case 'Zilliqa':
      //   return 20
      // case 'Neo':
      //   return 20
      // NOTE: (* Option 1) both 2 cases return the same value
      case 'Zilliqa':
      case 'Neo':
        return 20
      default:
        return -99
    }
  }

  // NOTE: (* Option 2) use factory pattern in getPriority function
  const getPriorityFactoryPattern = (blockchain: string): number => {
    return priorityMapping[blockchain] ?? -99
  }

  // const sortedBalances = useMemo(() => {
  const formattedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        // NOTE: assume that lhsPriority is balancePriority (wrong spelling)
        // const balancePriority = getPriority(balance.blockchain)
        // if (lhsPriority > -99) {
        //   if (balance.amount <= 0) {
        //     return true
        //   }
        // }
        // return false
        const balancePriority = getPriority(balance.currency)
        // NOTE: I keep the logic based on your business
        return balancePriority > -99 && balance.amount <= 0
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        // const leftPriority = getPriority(lhs.blockchain)
        // const rightPriority = getPriority(rhs.blockchain)
        const leftPriority = getPriority(lhs.currency)
        const rightPriority = getPriority(rhs.currency)
        // if (leftPriority > rightPriority) {
        //   return -1
        // } else if (rightPriority > leftPriority) {
        //   return 1
        // }
        return rightPriority - leftPriority
      })
      .map((balance: WalletBalance) => {
        return {
          ...balance,
          formatted: balance.amount.toFixed(),
        }
      })
  }, [balances])
  // NOTE: prices is not use in function so should not exist in dependencies
  // }, [balances, prices])

  // NOTE: move sortedBalances inside formattedBalances for fully useMemo support
  // const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
  //   return {
  //     ...balance,
  //     formatted: balance.amount.toFixed(),
  //   }
  // })

  // NOTE: use formattedBalances instead of sortedBalances
  // const rows = sortedBalances.map(
  const rows = formattedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount
      return (
        <WalletRow
          className={classes.row}
          // NOTE: use unique value to set key instead of index, use currency in this case (the unique id is better in this case)
          key={balance.currency}
          // key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      )
    }
  )

  return <div {...rest}>{rows}</div>
}
```

### Complete code

```typescript
interface WalletBalance {
  currency: string
  amount: number
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string
}

const priorityMapping = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
}

const WalletPage: React.FC<
  React.PropsWithChildren<React.ComponentPropsWithoutRef<'div'>>
> = (props) => {
  const { children, ...rest } = props
  const balances = useWalletBalances()
  const prices = usePrices()

  // NOTE: useCallback is optional because this function is simple so not cause pressure logic to browser and can lead to unnecessary complicate function
  const getPriority = useCallback((currency: string): number => {
    return priorityMapping[currency] ?? -99
  }, [])

  const formattedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.currency)
        return balancePriority > -99 && balance.amount <= 0
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.currency)
        const rightPriority = getPriority(rhs.currency)
        return rightPriority - leftPriority
      })
      .map((balance: WalletBalance) => {
        return {
          ...balance,
          formatted: balance.amount.toFixed(),
        }
      })
  }, [balances])

  const rows = formattedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount
      return (
        <WalletRow
          className={classes.row}
          key={balance.currency}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      )
    }
  )

  return <div {...rest}>{rows}</div>
}
```
