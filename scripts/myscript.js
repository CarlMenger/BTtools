var bod = document.getElementsByTagName('body')[0];


bod.insertAdjacentHTML('afterbegin', `
<!DOCTYPE html>
<html>
<body>

<div style="float:left">
<form>
<div style="float:left"><input type="text" placeholder="ticket name"></div>

<div style="float:left">
	<input type="checkbox" id="vehicle1" name="vehicle1" class="bt-checkbox"value="Bike" checked>
	<label for="vehicle1" class="bt-checkbox-label"> Bike</label><br>
	<input type="checkbox" id="vehicle2" name="vehicle2" class="bt-checkbox"value="Car" checked>
	<label for="vehicle2" class="bt-checkbox-label"> Car</label><br>
</div>

<div style="float:left">
	<input type="checkbox" id="vehicle3" name="vehicle3" class="bt-checkbox"value="Trolley" checked>
	<label for="vehicle3" class="bt-checkbox-label"> Trolley</label><br>
</div>

<div style="float:left"><input class="enter" type="submit" value="Send"/></div>
</div>
</form>

</body>
</html>
    `
);