#공부 열심히 하기 싫당  
#굴림체

import sys,random,time

# 현재 상영되고 있는 영화

a="영화A"
b="영화B"
c="영화C"
d="영화D"
movies = [a,b,c,d]

# 극장 = [날짜i[시간j[상영관k1,상영관2,상영관3,상영관4]]]

C_A = "서울"
C_B = "부산"
C_C = "대전"

A = [[[a,a,a,a],[b,c,d,a],[c,d,a,b],[d,a,c,b]],
     [[b,c,d,a],[c,d,a,b],[d,d,d,d],[a,a,a,c]],
     [[c,c,a,a],[d,a,b,c],[a,b,c,d],[b,c,d,a]],
     [[d,a,c,c],[a,a,d,c],[c,c,c,c],[d,a,c,d]]]

B = [[[a,a,a,a],[b,c,d,a],[c,d,a,b],[d,a,c,b]],
     [[c,c,a,a],[d,a,b,c],[a,b,c,d],[b,c,d,a]],
     [[b,c,d,a],[c,d,a,b],[d,d,d,d],[a,a,a,c]],
     [[d,a,c,c],[a,a,d,c],[c,c,c,c],[d,a,c,d]]]

C = [[[b,c,d,a],[c,d,a,b],[d,d,d,d],[a,a,a,c]],
     [[a,a,a,a],[b,c,d,a],[c,d,a,b],[d,a,c,b]],
     [[c,c,a,a],[d,a,b,c],[a,b,c,d],[b,c,d,a]],
     [[d,a,c,c],[a,a,d,c],[c,c,c,c],[d,a,c,d]]]


#티켓가격

c1 = 10000
c2 = 7000
c3 = 3000


############ 함수 ############

def CHOICE() : 
    c = '''
    카테고리를 선택하여 주십시오. [번호 입력]
    ===================================================
    [1]영화 검색/ [2]극장 검색/ [3]영화 예매/ [4]이벤트
    '''
    print(c)
    i=input(">>")
    return i


def scroll():
    print(".")
    time.sleep(1)
    print(".")
    time.sleep(1)
    print(".")
    time.sleep(1)
    return


def back() :
    s='''
======================================================='''
    print(s)
    print("\n\n뒤로가기[B]")
    i=input(">>")
    while (1):
        if i=="B":
            break
        else :
            print("\n입력방식이 잘못되었습니다. 다시 입력해주십시오.")
            i=input(">>")
    return


def mg() : 
    print("\n[영화]\n")
    for i in movies:print(i)
    back()
    return


def tg() : 
    print("\n[전국 CGV]")
    m = '''
[지역] [상영관 개수]
====================
|서울 [4]          |   
====================
|부산 [4]          |   
====================
|대전 [4]          |   
====================
'''
    print(m)
    back()
    return


def event() : 
    print("\n[EVENT]")
    EVENT = '''
=======================================
|커플 팝콘 증정 이벤트                |
=======================================
|신규 회원가입 고객 3000원 할인 이벤트|
=======================================
'''
    print(EVENT)
    back()
    return


qq = 0
def theater_choose(theater):
    global qq
    qq = qq + 1
    print("[%d]"%qq,end="")

    if theater==A:
        theater_f = C_A
    elif theater==B:
        theater_f = C_B
    elif theater==C:
        theater_f = C_C

    print (" |CGV %s| "%theater_f, end="")
        
    for i in theater:
        for j in i:
            if m in j:
                 print ("■")
                 return theater_f
             
    print ("□")
    return 0

    
def timetable(theater):
    for i in theater:
        day = theater.index(i)
        
        if day==0:
            day_f = "월"
        elif day==1:
            day_f = "화"
        elif day==2:
            day_f = "수"
        elif day==3:
            day_f = "목"
            
        print ("[%s]"%day_f)
        
        for j in i:
            time = i.index(j)

            if time==0:
                time_f = "13:00"
            elif time==1:
                time_f = "15:00"
            elif time==2:
                time_f = "17:00"
            elif time==3:
                time_f = "19:00"

            print ("%s "%time_f, end="")
    
            n = len(j)
            for s in range(0,n):
                
                if j[s] == m:
                    print ("■ ", end="")
                else :
                    print ("□ ", end="")

            print("")
        print("")
    print("")
    return


def time_choose_correct(t,i,j,k,m):
    
    if i == "월":
        day = 0
    elif i == "화":
        day = 1
    elif i == "수":
        day = 2
    elif i == "목":
        day = 3
    
    if j == "13:00":
        time = 0
    elif j == "15:00":
        time = 1
    elif j == "17:00":
        time = 2
    elif j == "19:00":
        time = 3
        
    if k == "1":
        the = 0
    elif k == "2":
        the = 1
    elif k == "3":
        the = 2
    elif k == "4":
        the = 3

    if i in ["월", "화", "수", "목"]:
        pass
    else:
        return 1

    if j in ["13:00", "15:00", "17:00", "19:00"]:
        pass
    else:
        return 1
    
    if k in ["1", "2", "3", "4"]:
        pass
    else:
        return 1

    if t == C_A:
        if A[day][time][the] == m:
            return m
        else:
            return 0

    elif t == C_B:
        if B[day][time][the] == m:
            return m
        else:
            return 0
            
    elif t == C_C:
        if C[day][time][the] == m:
            return m
        else:
            return 0


seat_f = []

def seat():
    s='''
=======================================
|             < screen >              |
=======================================
|입                                 출|
|구                                 구|

    '''
    print(">> ■ : 예매 완료 좌석\n>> □ : 예매 가능 좌석")
    print(s)

    for i in range(0,8):
        
        for j in range(10):
            print(chr(65+i)+ str(j+1) + '  ',end="")
        print("")            

        seat = [random.randint(0,1) for _ in range (0, 10)]
        seat_f.append(seat)            
        
        for k in range (0,10):
            if seat[k] == 0:
                print("□ ",end=" ")
            else :
                print("■ ",end=" ")  
        print("\n")
        
        seat=[]
        
    print("")
    return 


def seat_alpha():
    s='''
=======================================
|             < screen >              |
=======================================
|입                                 출|
|구                                 구|

    '''
    print("\n\n>> ■ : 예매 완료 좌석\n>> □ : 예매 가능 좌석\n>> ▣ : 선택한 좌석")
    print(s)
    
    for i in range(0,8):
        
        for j in range(10):
            print(chr(65+i)+ str(j+1) + '  ',end="")
        print("")
        
        for k in range (0,10):
            
            if seat_f[i][k] == 0:
                print("□ ",end=" ")
            elif seat_f[i][k] == 1 :
                print("■ ",end=" ")
            else :
                print("▣ ",end=" ")
                
        print("\n")
    print("")
    return 


def people_correct_1(p):
    while(1):
        try :
            p = int(p)
            break
        except:
            print("\n입력방식이 잘못되었습니다. 다시 입력해 주십시오.\n")
            p = input("성인   :")
    return p

def people_correct_2(p):
    while(1):
        try :
            p = int(p)
            break
        except:
            print("\n입력방식이 잘못되었습니다. 다시 입력해 주십시오.\n")
            p = input("청소년 :")
    return p

def people_correct_3(p):
    while(1):
        try :
            p = int(p)
            break
        except:
            print("\n입력방식이 잘못되었습니다. 다시 입력해 주십시오.\n")
            p = input("아동   :")

    return p


seat_choose_f1 = []
seat_choose_f2 = []

count = 1

def seat_choose_correct(seat_choose, i):    
    while(1):
        if len(seat_choose) == 2:
            if seat_choose[0] in ["A", "B", "C", "D", "E", "F", "G", "H"]:
                if seat_choose[1] in ["1", "2", "3", "4", "5", "6", "7", "8", "9"]:
                    seat_choose_f1.insert(i, ord(seat_choose[0]))
                    seat_choose_f2.insert(i, int(seat_choose[1]))
                    return seat_choose
                else:
                    print("\n입력방식이 잘못되었습니다. 다시 입력해주십시오.\n")
                    seat_choose = input("[%d] >>"%count)
            else:
                print("\n입력방식이 잘못되었습니다. 다시 입력해주십시오.\n")
                seat_choose = input("[%d] >>"%count)
                
        elif len(seat_choose) == 3:
            if seat_choose[0] in ["A", "B", "C", "D", "E", "F", "G", "H"]:
                if seat_choose[1] == "1":
                    if seat_choose[2] == "0":
                        seat_choose_f1.insert(i, ord(seat_choose[0]))
                        seat_choose_f2.insert(i, int(seat_choose[1] + seat_choose[2]))
                        return seat_choose
                    else:
                        print("\n입력방식이 잘못되었습니다. 다시 입력해주십시오.\n")
                        seat_choose = input("[%d] >>"%count)
                else:
                    print("\n입력방식이 잘못되었습니다. 다시 입력해주십시오.\n")
                    seat_choose = input("[%d] >>"%count)
            else:
                print("\n입력방식이 잘못되었습니다. 다시 입력해주십시오.\n")
                seat_choose = input("[%d] >>"%count)
        else :
            print("\n입력방식이 잘못되었습니다. 다시 입력해주십시오.\n")
            seat_choose = input("[%d] >>"%count)

            
seat_choose_list = []

def seat_choose(p):
    print("\n=======================================================")
    print("> 성인   : %d\n> 청소년 : %d\n> 아동   : %d\n\n총 %d개의 좌석 선택을 진행합니다. \n선택할 좌석을 하나씩 입력해 주십시오. \n\n하나의 좌석 입력 후 [Enter]를 눌러주십시오. [ex) A1 + [Enter] ]\n"%(p1, p2, p3, p))
    count = 1
    for i in range(p):
        seat_choose = input("[%d] >>"%count)
        seat_choose = seat_choose_correct(seat_choose, i)

        while(1):         
            if seat_f[seat_choose_f1[i]-65][seat_choose_f2[i]-1] == 1:
                print("\n이미 예매된 좌석입니다. 다시 좌석을 입력하여 주십시오.\n")
                seat_choose = input("[%d] >>"%count)
                seat_choose = seat_choose_correct(seat_choose, i)
                
            elif seat_f[seat_choose_f1[i]-65][seat_choose_f2[i]-1] == 0:
                seat_choose_list.insert(i, seat_choose)
                seat_f[seat_choose_f1[i]-65][seat_choose_f2[i]-1] = 2
                break
            
        count = count + 1

    seat_alpha()
            
    print("선택한 좌석은 ", end = "")
    for i in range(0, p):
        print(seat_choose_list[i] + " ", end = "")
    print("입니다. \n\n결제를 진행하시겠습니까? \n다시 좌석을 선택하고 싶다면 [B], 결제 진행은 [Y]를 입력해 주십시오.\n")
    go = input(">>")
    return go


######### intro #########

intro='''

==============================================================
 안녕하세요 > <

 이 프로그램은 CGV 홈페이지를 모방한
 영화 예매 프로그램 입니다.

 카테고리 선택 창에서
 3번을 누르면 영화 예매를 진행할 수 있습니다.

 추가해야 할 부분이 많은 프로그램입니다.

 [추가 예정]
 
 1. 카테고리 중 1, 2, 4 내용 추가 (ex. 영화 검색 - 영화 설명)
 2. 프로그램 실행 중 뒤로가기 만들기
 3. 오류찾기 (경우의 수 거의 다 찾음..)
 4. 출력 디자인 바꾸기
 5. 이미지화 (마우스 클릭으로 입력받기)
 
==============================================================
'''
print(intro)
p='''

=======================================================
                 WELCOME TO CGV [NAME]    
=======================================================
'''
print(p)
print("CGV에 오신 것을 환영합니다.")
i = CHOICE()

while (1):
    if i == "1":
        #영화 검색
        print("\n영화 검색 카테고리로 이동합니다.")
        scroll()
        mg()
        print("\n카테고리 선택 창으로 되돌아갑니다.")
        scroll()
        i = CHOICE()

    elif i == "2" :
        #극장 검색
        print("\n극장 검색 카테고리로 이동합니다.")
        scroll()
        tg()
        print("\n카테고리 선택 창으로 되돌아갑니다.")
        scroll()
        i = CHOICE()
        
    elif i == "3" :
        #영화 예매
        print("\n영화 예매 카테고리로 이동합니다.")
        scroll()
        break
    
    elif i == "4" :
        #이벤트
        print("\n이벤트 카테고리로 이동합니다.")
        scroll()
        event()
        print("\n카테고리 선택 창으로 되돌아갑니다.")
        scroll()
        i = CHOICE()

    else :
        print("\n입력방식이 잘못되었습니다. 다시 입력해주십시오.")
        i=input(">>")


####### 영화예매 #######
p='''
=======================================================
                      영화 예매    
=======================================================
'''
print(p)
c = 1
for i in movies:
    print(" [%d] "%c, end="")
    print(i)
    c = c+1

print("\n예매할 영화를 선택하여 주십시오. [번호 입력]\n")
k=input(">>")

while(1):
    if k in ["1","2","3","4"]:
        break
    else :
        print("\n입력방식이 잘못되었습니다. 다시 입력해주십시오.")
        k=input(">>")

m = movies[int(k)-1]
print("=======================================================")
print("\n[ %s ]를 상영하는 극장입니다. \n| 상영 0 :■/ 상영 X :□ |\n"%m)

t_a = theater_choose(A)
t_b = theater_choose(B)
t_c = theater_choose(C)

print("\n극장을 선택하여 주십시오. [번호 입력]")
i=input(">>")

t = 2
while (1):
    if i == "1":
        t = t_a
    elif i == "2":
        t = t_b
    elif i == "3":
        t = t_c
    else :
        print("\n입력방식이 잘못되었습니다. 다시 입력해주십시오.")
        i=input(">>")

    if t != 0:
        break
    elif t == 0 :
        print("본 극장에는 %s를 상영하지 않습니다. 다시 극장을 선택해 주십시오. [번호 입력]"%m)
        i=input(">>")

print("=======================================================")
print("\n[CGV %s] 상영 시간표\n\n | 상영시간 / 상영관 1 2 3 4 | \n | 상영 0 :■/ 상영 X :□ |\n"%t)

if t == C_A :
    timetable(A)
elif t == C_B :
    timetable(B)
elif t == C_C :
    timetable(C)

print("\n날짜,시간,상영관을 선택하여 주십시오.\n")
i = input("   날짜 [ex) 월   ] >>")
j = input("   시간 [ex) 13:00] >>")
k = input(" 상영관 [ex) 1    ] >>")

while(1):
    if time_choose_correct(t,i,j,k,m) == 1:
        print("\n\n입력방식이 잘못되었습니다. 다시 입력해 주십시오.\n")
        i = input("   날짜 [ex) 월   ] >>")
        j = input("   시간 [ex) 13:00] >>")
        k = input(" 상영관 [ex) 1    ] >>")

    elif time_choose_correct(t,i,j,k,m) == 0:
        print("\n\n선택한 시간에는 %s를 상영하지 않습니다. 다시 입력해 주십시오.\n"%m)
        i = input("   날짜 [ex) 월   ] >>")
        j = input("   시간 [ex) 13:00] >>")
        k = input(" 상영관 [ex) 1    ] >>")


    else:
        break
    

print("\n\n=======================================================")
print(i+ "요일", j, k+"상영관의 좌석 배치도입니다.")


# 좌석 만들기!

seat()

# 관람 인원수 입력
print("\n\n=======================================================")
print("[요금]\n\n |성인(만 19세 이상)   10000\n |청소년(만 19세 미만) 7000\n |아동(36개월 이하)    3000\n\n관람 인원수를 입력해 주십시오.\n|성인/ 청소년/ 아동|\n")

p1=input("성인   :")
p1=people_correct_1(p1)

p2=input("청소년 :")
p2=people_correct_2(p2)

p3=input("아동   :")
p3=people_correct_3(p3)

p = p1+ p2+ p3

while(1):
    if p == 0:
        print("관람 인원수는 1 이상이어야 합니다. 다시 관람 인원수를 입력해 주십시오.\n")
        p1=input("성인   :")
        p1=people_correct_1(p1)

        p2=input("청소년 :")
        p2=people_correct_2(p2)

        p3=input("아동   :")
        p3=people_correct_3(p3)

        p = p1+ p2+ p3
    else : break


# 좌석 선택
sc = seat_choose(p)

while(1):
    if sc == "B":
        for i in range(p):
            seat_f[seat_choose_f1[i]-65][seat_choose_f2[i]-1] = 0
        sc = seat_choose(p)
    elif sc == "Y":
        break
    else :
        print("\n\n입력방식이 잘못되었습니다. 다시 입력해 주십시오.\n")
        sc = input(">>")

# 결제
print("\n\n=======================================================")
print("[결제]")

coupon = 0

receipt1 ='''
   =====================================
    --------------영수증---------------                           
     극장 [CGV %s]

     [ %s ]
     
     상영 날짜: %s
     상영 시간: %s

     %s 상영관

     [좌석]
     > '''%(t,m,i,j,k)

# 좌석 출력
receipt2 = '''
    ___________________________________ 
     영화 티켓 가격                                                             

     성인   10000                       
     청소년  7000                       
     아동    3000                                                        

    [결제 내역]                         
    ----------------------------------- 
     성인  [%d]   : %d                        
     청소년[%d]   : %d                        
     아동  [%d]   : %d
     
     합산 금액: %d                      
     할인 금액: %d                      
    ___________________________________ 
     총 결제 금액: %d                   
                                        
     성공적으로 결제가 완료되었습니다.  
     CGV를 이용해주셔서 감사합니다.     
    ___________________________________ 
   =====================================
  '''%(p1, p1*c1, p2, p2*c2, p3, p3*c3, p1*c1+p2*c2+p3*c3, coupon, p1*c1+p2*c2+p3*c3-coupon)

print(receipt1, end="")

for i in range(0, p):
    print(seat_choose_list[i] + " ", end = "")
    
print(receipt2)

# END
