import requests
from bs4 import BeautifulSoup

url = 'https://www.koreabaseball.com/Schedule/Schedule.aspx'

# GET 요청을 보내고 응답을 받아옵니다.
response = requests.get(url)

# 응답의 HTML 내용을 BeautifulSoup으로 파싱합니다.
soup = BeautifulSoup(response.text, 'html.parser')

# 원하는 데이터를 추출합니다.
# 예를 들어, 일정 테이블의 모든 행을 가져오려면:
schedule_table = soup.find('table', attrs={'id': 'tblSchedule'})
if schedule_table is not None:
    rows = schedule_table.find_all('tr')

    # 각 행에서 데이터를 추출합니다.
    for row in rows:
        # 행의 셀을 가져오거나 처리합니다.
        cells = row.find_all('td')
        for cell in cells:
            # 셀 내용을 출력하거나 원하는 방식으로 처리합니다.
            print(cell.text)
else:
    print("일정 테이블을 찾을 수 없습니다.")

# 필요한 데이터를 가져와서 원하는 방식으로 처리합니다.
# 위 코드는 예시일 뿐이므로 실제 데이터 추출 및 처리에 맞게 수정해야 합니다.

