from random import randint
trials = 1000000000
busResult = 0
lastUSResult = 0

for i in range(0, trials):
    usFans = 11
    nedFans = 7
    buses = 0
    lastPick = 2

    while usFans != 0 and nedFans != 0:
        if randint(0, 1):
            buses += 0 if lastPick == 1 else 1
            usFans -= 1
            lastPick = 1
        else:
            buses += 0 if lastPick == 0 else 1
            nedFans -= 1
            lastPick = 0

    lastUSResult += 0 if usFans == 0 else 1
    busResult += buses

print(f'Probability last bus was US fans: {lastUSResult/trials}')
print(f'Average number of buses: {busResult/trials}')
