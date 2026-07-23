#Exerciese from module day06
#1
class Report:
    def build(self):
        print("Building report")

class ReportSaver:
    def save(self):
        print("Saving report")

class ReportEmailer:
    def email(self):
        print("Emailing report")

report = Report()
report.build()

saver = ReportSaver()
saver.save()

emailer = ReportEmailer()
emailer.email()

print('\n')
#2
import math

class Shape:
    def area(self):
        pass

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return math.pi * self.radius ** 2

class Square(Shape):
    def __init__(self, side):
        self.side = side

    def area(self):
        return self.side ** 2

class Triangle(Shape):
    def __init__(self, base, height):
        self.base = base
        self.height = height

    def area(self):
        return 0.5 * self.base * self.height

shapes = [Circle(5), Square(4), Triangle(6, 3)]

for shape in shapes:
    print(shape.area())

print('\n')
#3
class AppSettings:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.currency = "ETB"
        return cls._instance

settings1 = AppSettings()
settings2 = AppSettings()

print(settings1.currency)
print(settings2.currency)
print(settings1 is settings2)

print('\n')
#4
class Circle:
    def draw(self):
        print("Drawing Circle")

class Square:
    def draw(self):
        print("Drawing Square")

class Triangle:
    def draw(self):
        print("Drawing Triangle")

class ShapeFactory:
    @staticmethod
    def create(kind):
        if kind.lower() == "circle":
            return Circle()

        elif kind.lower() == "square":
            return Square()

        elif kind.lower() == "triangle":
            return Triangle()

        else:
            raise ValueError("Unknown shape")

shape = ShapeFactory.create("circle")
shape.draw()

shape = ShapeFactory.create("square")
shape.draw()

shape = ShapeFactory.create("triangle")
shape.draw()

print('\n')
#5
class NewsAgency:
    def __init__(self):
        self.subscribers = []

    def subscribe(self, subscriber):
        self.subscribers.append(subscriber)

    def notify(self, news):
        for subscriber in self.subscribers:
            subscriber.update(news)

class PhoneSubscriber:
    def update(self, news):
        print(f"Phone received: {news}")

class EmailSubscriber:
    def update(self, news):
        print(f"Email received: {news}")

agency = NewsAgency()

phone = PhoneSubscriber()
email = EmailSubscriber()

agency.subscribe(phone)
agency.subscribe(email)

agency.notify("New update has been released!")